import React from 'react';
import {cx, css} from '@emotion/css';

import {useAlgorand} from '../../../../Packages/Algorand';

import {Button, Input} from '../../../../Components';

function reducer(state, action) {
  switch (action.type) {
    case 'setAmount': {
      return {
        ...state,
        amount: action.payload
      };
    }
    case 'setSender': {
      return {
        ...state,
        sender: action.payload
      };
    }
    case 'setRecipient': {
      return {
        ...state,
        recipient: action.payload
      };
    }
    case 'setNote': {
      return {
        ...state,
        note: action.payload
      };
    }
    default:
      return state;
  }
}

export {reducer};

const styles = {
  actions: css({
    margin: '8px 0 0 0',
  }),
};

function Payment(props) {
  const algorand = useAlgorand();
  const [state, dispatch] = React.useReducer(reducer, {
    amount: '',
    sender: algorand.state.account,
    recipient: '',
    note: ''
  });

  const setAmount = (nextAmount) => {
    dispatch({type: 'setAmount', payload: nextAmount});
  };
  const setSender = (nextSender) => {
    dispatch({type: 'setSender', payload: nextSender});
  };
  const setRecipient = (nextRecipient) => {
    dispatch({type: 'setRecipient', payload: nextRecipient});
  };
  const setNote = (nextNote) => {
    dispatch({type: 'setNote', payload: nextNote});
  };

  const execute = () => {};

  return (
    <>
      <Input.Text
        placeholder="Amount"
        value={state.amount}
        onChange={setAmount}
      />
      <Input.Text
        placeholder="Sender"
        value={state.sender}
        onChange={setSender}
      />
      <Input.Text
        placeholder="Recipient"
        value={state.recipient}
        onChange={setRecipient}
      />
      <Input.Textarea
        placeholder="Note"
        value={state.note}
        onChange={setNote}
      />
      {algorand.isConnected &&
        <div className={cx(styles.actions)}>
          <Button
            title="Execute"
            onClick={execute}
          />
        </div>
      }
    </>
  );
}

export {Payment};