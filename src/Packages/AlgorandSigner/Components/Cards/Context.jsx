import React from 'react';

const Context = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'pushCard': {
      return {
        ...state,
        currentCard: state.currentCard + 1,
        cards: [...state.cards, action.payload],
        isTransitioning: 'forward',
      };
    }
    case 'popCard': {
      return {
        ...state,
        currentCard: state.currentCard - 1,
        isTransitioning: 'backward'
      };
    }
    case 'completeTransition': {
      let nextCards = state.cards;
      const lastCard = state.cards.length - 1;
      if (state.currentCard < lastCard) {
        nextCards = nextCards.slice(0, state.currentCard + 1);
      }

      return {
        ...state,
        cards: nextCards,
        isTransitioning: false
      };
    }
    case 'initializeCards': {
      return {
        ...state,
        cards: action.payload,
        currentCard: 0
      };
    }
    default: {
      return state;
    }
  }
}

function Provider(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    cards: [],
    currentCard: null,
    isTransitioning: false
  });

  const initializeCards = (initialCards) => {
    if (state.cards.length === 0) {
      dispatch({type: 'initializeCards', payload: initialCards});
    }
  }
  const navigateTo = (card) => {
    dispatch({type: 'pushCard', payload: card});
  };
  const navigateBack = () => {
    dispatch({type: 'popCard'});
  };
  const completeTransition = () => {
    dispatch({type: 'completeTransition'});
  };

  const currentCard = state.cards[state.currentCard];

  return (
    <Context.Provider
      value={{
        state,
        currentCard,
        initializeCards,
        navigateTo,
        navigateBack,
        completeTransition
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {Context, Provider};