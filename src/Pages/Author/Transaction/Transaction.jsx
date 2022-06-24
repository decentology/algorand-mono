import React from 'react';
import {cx, css} from '@emotion/css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';

import {useAlgorand} from '../../../Packages/Algorand';

import {Button, Input} from '../../../Components';
import {Breadcrumbs} from '../../../Components/Page';

import * as types from './types';
import {colors} from '../../../utilities';

function reducer(state, action) {
  switch (action.type) {
    case 'setType': {
      return {
        ...state,
        type: action.payload
      };
    }
    default:
      return state;
  }
}

export {reducer};

const styles = {
  separator: css({
    margin: '8px 0 16px',
    border: `1px solid ${colors.material.grey[300]}`,
    borderWidth: '1px 0 0 0',
  }),
  actions: css({
    margin: '8px 0 0 0',
  }),
};

function Transaction(props) {
  const algorand = useAlgorand();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, {
    type: 'payment'
  });

  const type = location.pathname.split('/author/transaction')[1].replace('/', '');
  console.log(type);

  const setType = (nextType) => {
    navigate(`/author/transaction/${nextType}`);
    // dispatch({type: 'setType', payload: nextType});
  };

  const execute = () => {};

  return (
    <>
      <Breadcrumbs />
      <h1 className="title">Transaction Author</h1>
      <h2 className="subtitle">Online Algorand transaction composer</h2>
      <Input.Options
        list={[
          {title: 'Payment', value: 'payment'},
          {title: 'Asset transfer', value: 'assetTransfer'}
        ]}
        placeholder="Type"
        value={type}
        onChange={setType}
      />

      {type &&
        <div className={cx(styles.separator)} />
      }

      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/payment" element={<types.Payment />} />
        <Route path="/assetTransfer" element={<types.AssetTransfer />} />
      </Routes>
      
      {!algorand.isConnected &&
        <div className="notification is-info is-size-6">
          Please <strong>connect</strong> your Pera Algo Wallet in order to execute this transaction.
        </div>
      }
    </>
  );
}

export {Transaction};