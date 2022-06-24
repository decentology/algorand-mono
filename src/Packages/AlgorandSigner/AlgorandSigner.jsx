import React from 'react';

import {useAlgorand} from '../Algorand/useAlgorand.js';

import {Transaction} from './Model';

import * as Cards from './Cards';

import {Modal} from './Components';
import {
  Deck,
  Provider as CardsProvider,
  Context as CardsContext
} from './Components/Cards';

import {useDevice} from '../../utilities/Device.js';

import {Context} from './Context.jsx';

function AlgorandSigner(props) {
  const context = React.useContext(Context);
  const cards = React.useContext(CardsContext);
  const algorand = useAlgorand();

  const close = () => {
    algorand.cancelTransactions();
  };

  React.useEffect(() => {
    if (context.transaction.type) {
      // We can prepare the first card since we now have the Transaction type.
      const type = Transaction.types.find((candidate) => candidate.type === context.transaction.type);
      const card = {
        component: Cards.Transaction[type.ID],
        props: {
          title: 'Transaction',
          transaction: context.transaction
        }
      };
      cards.initializeCards([card]);
    }
  }, [context.transaction, algorand, cards, context.walletURL]);

  return (
    <Modal onClose={close}>
      <Deck />
    </Modal>
  );
}

class RoundSubscription {
  constructor(waitFor, callback) {
    this.waitFor = waitFor;
    this.round = null;
    this.isActive = false;
    this.callback = callback;
  }
  start() {
    this.isActive = true;
    this.iteration();
  }
  stop() {
    this.isActive = false;
  }
  async iteration() {
    if (this.isActive) {
      this.round = await this.waitFor(this.round);
      if (this.isActive) {
        this.callback(this.round);
        this.iteration();
      }
    }
  }
}

function AlgorandSignerWrapper(props) {
  const algorand = useAlgorand();
  const device = useDevice();

  let walletURL = 'algorand://';
  if (device.isAndroid) {
    walletURL = 'wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1';
  } else if (device.isAppleMobile) {
    walletURL = 'algorand-wc://wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1';
  } else {
    walletURL = null;
  }

  const transaction = algorand.state.preparedTransactions[0];

  const [subscription, setSubscription] = React.useState(null);
  const [round, setRound] = React.useState(null);

  React.useEffect(() => {
    const transaction = algorand.state.preparedTransactions[0];

    if (!subscription && transaction && (!transaction.lastRound || transaction.lastRound >= round)) {
      const subscription = new RoundSubscription(
        algorand.waitForRound,
        (nextRound) => setRound(nextRound)
      );
      subscription.start();
      setSubscription(subscription);
    } else if (subscription && (!transaction || transaction.lastRound < round)) {
      subscription.stop();
      setSubscription(null);
    }
  }, [algorand.waitForRound, algorand.state.preparedTransactions, subscription, round]);

  return (
    <Context.Provider
      value={{
        transaction,
        round,
        walletURL
      }}
    >
      {transaction &&
        <CardsProvider>
          <AlgorandSigner />
        </CardsProvider>
      }
      {props.children}
    </Context.Provider>
  );
}

export {AlgorandSignerWrapper as AlgorandSigner};