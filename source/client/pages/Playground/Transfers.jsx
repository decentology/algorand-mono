import React, {useReducer, useEffect} from 'react';

import {useAlgorand} from '../../../packages/hyperverse';

import Transactions from '../../components/Algorand/Transactions';

function reducer(state, action) {
  switch (action.type) {
    case 'setRecipient': {
      return {
        ...state,
        recipient: action.payload
      };
    }
    case 'setAmount': {
      return {
        ...state,
        amount: action.payload
      };
    }
    default:
      return state;
  }
}

function Transfers(props) {
  const algorand = useAlgorand();
  const [state, dispatch] = useReducer(reducer, {
    // recipient: 'BHXS3Y3QWYL5NCD3A2OW2BHLAIIMWSWGJ33UD6DI7WTFYRBWF4ZUTNWREQ',
    recipient: 'CCGJ7X6IAB5X3FDS3SX2BC4UOAOOTLQTY5ZK42K5BXZPLMF6PD3AFQK7NU',
    amount: '0.0001',
    transaction: null
  });

  const onChangeRecipient = async (event) => {
    dispatch({
      type: 'setRecipient',
      payload: event.target.value
    });
  };
  const onChangeAmount = async (event) => {
    dispatch({
      type: 'setAmount',
      payload: event.target.value
    });
  };
  const onTransfer = async () => {
    await algorand.transferAlgo(
      state.recipient,
      Number.parseFloat(state.amount) * 1000000,
      'Algorand.dev #1'
    );
  };

  return (
    <React.Fragment>
      <h3>Transfers</h3>
      <section className="content">
        <p>
          Use this form to transfer <code>ALGO</code> tokens to any recipient.
        </p>
        <div className="field">
          <label className="label">Recipient</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Algorand address"
              value={state.recipient || ''}
              onChange={onChangeRecipient}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Amount</label>
          <div className="field has-addons">
            <div className="control">
              <button className="button is-static">Algo</button>
            </div>
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="0.0"
                value={state.amount || ''}
                onChange={onChangeAmount}
              />
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              onClick={onTransfer}
            >
              Transfer
            </button>
          </div>
        </div>
      </section>
      <section className="content">
        {algorand.hasTransactions &&
          <Transactions />
        }
      </section>
    </React.Fragment>
  );
}

export default Transfers;