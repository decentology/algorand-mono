import React from 'react';

const Context = React.createContext({});

function reducer(state, action) {
  switch (action.type) {
    case 'open': {
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        actions: action.payload.actions,
      };
    }
    case 'close': {
      return {
        ...state,
        title: null,
        body: null,
        actions: null
      };
    }
    default: {
      return  state;
    }
  }
}

function Provider(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    title: null,
    body: null,
    actions: null
  });

  const isVisible = state.title !== null;

  const open = (props) => {
    dispatch({type: 'open', payload: props});
  };
  const close = () => {
    dispatch({type: 'close'});
  };
  
  return (
    <Context.Provider
      value={{
        state,
        isVisible,
        open,
        close
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context,
  Provider
};