function reducer(state, action) {
  switch (action.type) {
    case 'setInitialized': {
      return {
        ...state,
        isInitialized: true
      };
    }
    case 'didConnect': {
      const connector = action.payload;

      return {
        ...state,
        connector,
        account: connector.accounts[0]
      };
    }
    case 'didDisconnect': {
      return {
        ...state,
        connector: null,
        account: null
      };
    }

    // Transaction started.
    case 'initializeTransaction': {
      return {
        ...state,
        preparedTransactions: [
          ...state.preparedTransactions,
          action.payload
        ]
      };
    }
    case 'updateTransaction': {
      const transaction = state.preparedTransactions.find((candidate) => candidate.identifier === action.payload.identifier);
      const nextTransactions = state.preparedTransactions.filter((candidate) => candidate !== transaction);
      
      return {
        ...state,
        preparedTransactions: [
          ...nextTransactions,
          {
            ...transaction,
            ...action.payload
          }
        ]
      };
    }

    case 'cancelTransactions': {
      return {
        ...state,
        preparedTransactions: []
      };
    }

    case 'flushTransactions': {
      const nextPreparedTransactions = [];
      const nextExecutedTransactions = [...state.executedTransactions];

      for (const transaction of state.preparedTransactions) {
        if (transaction.state < 4) {
          nextPreparedTransactions.push(transaction);
        } else {
          nextExecutedTransactions.push(transaction);
        }
      }

      return {
        ...state,
        preparedTransactions: nextPreparedTransactions,
        executedTransactions: nextExecutedTransactions
      };
    }

    case 'setRound': {
      return {
        ...state,
        round: action.payload
      };
    }
    
    default:
      return action;
  }
}

export default reducer;