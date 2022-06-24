import React from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import algosdk from 'algosdk';
import {formatJsonRpcRequest} from '@json-rpc-tools/utils';

import reducer from './reducer.js';

const Context = React.createContext();

// AlgoExplorer moved their Node and Indexer endpoints, which is why the original algorand.dev isn't working.
const client = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io/', '');
const indexer = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io/', '');
// const explorer = 'https://testnet.algoexplorer.io';

const constants = {
  walletConnectOptions: {
    bridge: 'https://bridge.walletconnect.org',
    qrcodeModal: QRCodeModal
  },
  transactionTimeout: 10, // rounds
  transactionState: {
    empty: 0,
    ready: 1,
    sent: 2,
    signed: 3,
    executed: 4,
    error: 5
  }
};

function Provider(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    connector: null,
    account: null,
    preparedTransactions: [],
    executedTransactions: [],
    isInitialized: false,
    isWaiting: false,
    round: null
  });

  const audioRef = React.useRef(null);

  const attachConnectorListeners = React.useCallback(
    (connector) => {

      connector.on('connect', (error, payload) => {
        dispatch({type: 'didConnect', payload: connector});
      });
      connector.on('disconnect', (error, payload) => {
        dispatch({type: 'didDisconnect'});
        console.log(error, payload);
      });
      connector.on('session_request', (error, payload) => {
        console.log('session_request');
        console.log(error, payload);
      });
      connector.on('session_update', (error, payload) => {
        console.log('session_update');
        console.log(error, payload);
      });
      connector.on('call_request', async (error, payload) => {
        // Once a signature request is performed, this is triggered.
        if (error && error.message === 'Parse error') {
          // I haven't figured a reason why this error occurs.
          // It always happens after I reload Chrome while having Pera wallet open.
          // The error is comes directly from WalletConnect as a WebSocket message.
          // Reference:
          // 1. https://github.com/WalletConnect/walletconnect-monorepo/blob/v1.0/packages/clients/core/src/events.ts#L66
          // 2. https://github.com/WalletConnect/walletconnect-monorepo/blob/54f3ca0b1cd1ac24e8992a5a812fdfad01769abb/packages/helpers/utils/src/validators.ts#L56
          return;
        }
        console.log('call_request');
        console.log(error, payload);
      });
      connector.on('wc_sessionRequest', (error, payload) => {
        console.log('wc_sessionRequest');
        console.log(error, payload);
      });
      connector.on('wc_sessionUpdate', (error, payload) => {
        console.log('wc_sessionUpdate');
        console.log(error, payload);
      });
    },
    []
  );

  const connect = async () => {
    const connector = new WalletConnect(constants.walletConnectOptions);
    await connector.createSession();
    attachConnectorListeners(connector);
    if (!connector.connected) {
      await connector.createSession();
      if (connector.connected) {
        dispatch({type: 'didConnect', payload: connector});
      }
    }
  };
  const reconnect = React.useCallback(
    () => {
      const connector = new WalletConnect(constants.walletConnectOptions);
      attachConnectorListeners(connector);
      if (connector.connected) {
        dispatch({type: 'didConnect', payload: connector});
      }
      dispatch({type: 'setInitialized', payload: true});
    },
    [attachConnectorListeners]
  );
  const disconnect = async () => {
    if (state.connector) {
      await state.connector.killSession();
    }
  };

  React.useEffect(() => {
    reconnect();
  }, [reconnect]);

  const waitForTransaction = async (transaction, transactionID) => {
    const status = await client.status().do();
    let currentRound = status['last-round'];
    const timeoutRound = currentRound + constants.transactionTimeout;

    while (currentRound < timeoutRound) {
      const information = await client.pendingTransactionInformation(transactionID).do();
      console.log(information);
      const poolError = information['pool-error'];
      if (poolError) {
        // There was an error and this transaction is now dead.
        throw poolError;
      }
      const confirmedRound = information['confirmed-round'];
      if (confirmedRound) {
        // This transaction has been included in the blockchain.
        dispatch({
          type: 'updateTransaction',
          payload: {
            ...transaction,
            state: constants.transactionState.executed,
            ID: transactionID
          }
        });

        return confirmedRound;
      }

      const nextRound = currentRound + 1;
      await client.statusAfterBlock(nextRound).do();
      currentRound = nextRound;
    }

  }

  const onSignatureSuccess = async (transaction, signedTransaction) => {
    dispatch({
      type: 'updateTransaction',
      payload: {
        ...transaction,
        state: constants.transactionState.signed
      }
    });

    const decodedTransaction = signedTransaction.map((part) => {
      if (part) {
        return new Uint8Array(Buffer.from(part, 'base64'))
      } else {
        return null;
      }
    });

    try {
      const response = await client.sendRawTransaction(decodedTransaction).do();
      waitForTransaction(transaction, response.txId);
    } catch (error) {
      dispatch({
        type: 'updateTransaction',
        payload: {
          ...transaction,
          state: constants.transactionState.error,
          error: {
            severity: 'high',
            message: error.response.body.message.replace('TransactionPool.Remember: ', '')
          }
        }
      });
    }
  };
  const onSignatureFailure = async (transaction, error) => {
    let severity = null;
    let message = null;
    if (error.message.startsWith('Transaction Request Rejected:')) {
      severity = 'medium';
      message = 'User refused to sign transaction.';
    }
    
    dispatch({
      type: 'updateTransaction',
      payload: {
        ...transaction,
        state: constants.transactionState.error,
        error: {
          severity,
          message
        }
      }
    });
  };

  const sign = async (transaction) => {
    // Start playing silence to keep WalletConnect WebSockets alive.
    audioRef.current?.play();

    const encodedTransaction = Buffer
      .from(algosdk.encodeUnsignedTransaction(transaction.raw))
      .toString('base64');
    
    const request = formatJsonRpcRequest(
      'algo_signTxn',
      [
        [
          {
            txn: encodedTransaction,
            message: 'Algorand.dev'
          }
        ]
      ]
    );

    try {
      const responsePromise = state.connector.sendCustomRequest(request);

      // Mark transaction as sent.
      dispatch({
        type: 'updateTransaction',
        payload: {
          ...transaction,
          state: constants.transactionState.sent
        }
      });

      const response = await responsePromise;

      audioRef.current?.pause();
      onSignatureSuccess(transaction, response);
    } catch (error) {
      audioRef.current?.pause();
      onSignatureFailure(transaction, error);
    }
  };

  const compile = async (teal) => {
    const program = await client.compile(teal).do();
    const bytecode = Uint8Array.from(Buffer.from(program.result, 'base64'));

    return bytecode;
  };
  const deploy = async (approvalCode, clearCode, stateAllocation, note = null) => {
    // Temporary identifier before more information is known about the transaction.
    const identifier = Date.now();

    dispatch({
      type: 'initializeTransaction',
      payload: {
        identifier,
        state: constants.transactionState.empty
      }
    });

    const suggestedParams = await client.getTransactionParams().do();
    const lastRound = suggestedParams.firstRound + 10;

    const approvalProgram = await compile(approvalCode);
    const clearProgram = await compile(clearCode);

    // Reference: https://algorand.github.io/js-algorand-sdk/modules.html#makeApplicationCreateTxnFromObject
    const transaction = await algosdk.makeApplicationCreateTxnFromObject({
      approvalProgram,
      clearProgram,
      from: state.account,
      note: note !== null ? Uint8Array.from(Buffer.from(note, 'utf-8')) : undefined,
      numGlobalByteSlices: Number.parseInt(stateAllocation.global.bytes),
      numGlobalInts: Number.parseInt(stateAllocation.global.integers),
      numLocalByteSlices: Number.parseInt(stateAllocation.local.bytes),
      numLocalInts: Number.parseInt(stateAllocation.local.integers),
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      suggestedParams: {
        ...suggestedParams,
        lastRound
      },
    });

    dispatch({
      type: 'updateTransaction',
      payload: {
        identifier,
        state: constants.transactionState.ready,
        type: transaction.type,
        appOnComplete: transaction.appOnComplete,
        fee: transaction.fee,
        firstRound: suggestedParams.firstRound,
        lastRound,
        approvalCode,
        clearCode,
        from: state.account,
        note,
        raw: transaction
      }
    });
  };

  const redeploy = async (applicationID, approvalCode, clearCode) => {
    const approvalProgram = await compile(approvalCode);
    const clearProgram = await compile(clearCode);

    const suggestedParams = await client.getTransactionParams().do();

    // Reference: https://algorand.github.io/js-algorand-sdk/modules.html#makeApplicationUpdateTxnFromObject
    const transaction = await algosdk.makeApplicationUpdateTxnFromObject({
      appIndex: applicationID,
      approvalProgram,
      clearProgram,
      from: state.account,
      suggestedParams: {
        ...suggestedParams,
        lastRound: suggestedParams.firstRound + 10
      }
    });

    sign(transaction);
  };

  const execute = async (applicationID, method, parameters = []) => {
    const suggestedParams = await client.getTransactionParams().do();

    const encodedParameters = [
      method,
      ...parameters
    ].map((parameter) => {
      if (typeof parameter === 'string') {
        return Uint8Array.from(parameter, (character) => character.charCodeAt(0));
      } else if (Number.isInteger(parameter)) {
        return algosdk.encodeUint64(parameter);
      } else {
        return null;
      }
    }).filter((parameter) => parameter !== null);

    // Reference: https://algorand.github.io/js-algorand-sdk/modules.html#makeApplicationNoOpTxnFromObject
    const transaction = await algosdk.makeApplicationNoOpTxnFromObject({
      appArgs: encodedParameters,
      appIndex: applicationID,
      from: state.account,
      suggestedParams: {
        ...suggestedParams,
        lastRound: suggestedParams.firstRound + 10
      }
    });

    sign(transaction);
  };

  const executeABI = async (application, method, parameters) => {
    const suggestedParams = await client.getTransactionParams().do();
    
    const composer = new algosdk.AtomicTransactionComposer();

    // TODO: This doesn't work because [signer] is not aware of WalletConnect and crashes.

    composer.addMethodCall({
      method: application.methods.find((candidate) => candidate.name === method),
      methodArgs: [33],
      appID: application.networks[suggestedParams.genesisHash].appID,
      sender: state.account,
      suggestedParams,
      signer: algosdk.makeBasicAccountTransactionSigner(state.account)
    });

    // const group = composer.buildGroup();
    const result = await composer.execute(client, 10);
    console.log(result);
  };

  const cancelTransactions = () => {
    dispatch({type: 'cancelTransactions'});
  };
  const flushTransactions = () => {
    dispatch({type: 'flushTransactions'});
  };

  const waitForRound = async (round = null) => {
    if (round) {
      const status = await client.statusAfterBlock(round).do();
      return status['last-round'];
    } else {
      const status = await client.status().do();
      return status['last-round'];
    }
  };

  // Assemble Algorand module contexts.
  let children = props.children;
  if (state.isInitialized) {
    for (const module of props.modules) {
      children = React.createElement(
        module.bundle.Provider,
        null,
        children
      );
    }
  }

  const fetchApplications = async () => {
    // FIX: Can't get this to work, just times out.
    // const response = await indexer.searchForTransactions().notePrefix(notePrefix).do();
    const response = await indexer.lookupAccountTransactions(state.account).do();
    const transactions = response.transactions.filter((candidate) =>
      typeof candidate['application-transaction'] !== 'undefined' &&
      typeof candidate['note'] !== 'undefined'
    );
    const applications = [];
    for (const transaction of transactions) {
      const note = Buffer.from(transaction.note, 'base64').toString('utf-8');
      if (note.startsWith('App|')) {
        applications.push({
          title: note.replace('App|', ''),
          ID: transaction['created-application-index'],
          timestamp: transaction['round-time'],
          note
        });
      }
    }

    return applications;
  };

  const fetchApplication = async (applicationID) => {
    const response = await indexer.lookupApplications(applicationID).do();
    const {application} = response;
    if (application) {
      console.log(application);
      return {
        ID: application.id,
        approvalProgram: application.params['approval-program'],
        clearProgram: application.params['clear-state-program'],
      };
    }
  };

  const linkTo = (thing, identifier) => {
    let explorerURL = 'https://testnet.algoexplorer.io';

    switch (thing) {
      case 'account': {
        return `${explorerURL}/address/${identifier}`;
      }
      case 'block': {
        return `${explorerURL}/block/${identifier}`;
      }
      case 'transaction': {
        return `${explorerURL}/tx/${identifier}`;
      }
      case 'application': {
        return `${explorerURL}/application/${identifier}`;
      }
      default:
        return null;
    }
  };

  const isConnected = state.account && state.account.length > 0 ? true : false;
  const hasPreparedTransactions = state.preparedTransactions.length > 0;
  console.log(state);

  return (
    <Context.Provider
      value={{
        state,
        isConnected,
        hasPreparedTransactions,
        connect,
        disconnect,
        reconnect,
        sign,
        compile,
        deploy,
        redeploy,
        execute,
        executeABI,
        cancelTransactions,
        flushTransactions,
        waitForRound,
        linkTo,
        fetchApplications,
        fetchApplication
      }}
    >
      <audio
        id="WalletConnectSocketMaintainer"
        ref={audioRef}
        src="https://github.com/anars/blank-audio/blob/master/30-seconds-of-silence.mp3?raw=true"
        hidden
      />
      {children}
    </Context.Provider>
  );
}

export {
  Context,
  Provider
};