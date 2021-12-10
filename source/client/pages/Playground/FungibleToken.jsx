import React, {useEffect, useState, useReducer} from 'react';

import {useAlgorand} from '../../../packages/hyperverse';

import Transactions from '../../components/Algorand/Transactions';

function fetch(identifier, fallback) {
  const storageItem = window.localStorage.getItem(identifier);
  return storageItem === null ? fallback : storageItem;
}
function store(identifier, value) {
  window.localStorage.setItem(identifier, `${value}`);
}

function reducer(state, action) {
  switch (action.type) {
    case 'setRecipient': {
      return {
        ...state,
        recipient: action.payload
      };
    }
    case 'setAssetIndex': {
      store('FungibleToken.assetIndex', action.payload);
      return {
        ...state,
        assetIndex: action.payload
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

function Application(props) {
  const algorand = useAlgorand();
  const [state, dispatch] = useReducer(reducer, {
    // recipient: 'BHXS3Y3QWYL5NCD3A2OW2BHLAIIMWSWGJ33UD6DI7WTFYRBWF4ZUTNWREQ',
    // recipient: 'CCGJ7X6IAB5X3FDS3SX2BC4UOAOOTLQTY5ZK42K5BXZPLMF6PD3AFQK7NU',
    recipient: null,
    assetIndex: fetch('FungibleToken.assetIndex', 47378896),
    amount: '0.01',
    transaction: null
  });

  const onChangeRecipient = async (event) => {
    dispatch({
      type: 'setRecipient',
      payload: event.target.value
    });
  };
  const onChangeAssetIndex = async (event) => {
    dispatch({
      type: 'setAssetIndex',
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
    await algorand.sendAsset(
      state.recipient,
      state.assetIndex,
      state.amount
    );
  };

  return (
    <React.Fragment>
      <h3>Fungible Token</h3>
      <p>
        The <em>Fungible Token</em> smart module allows users to easily deploy a fungible token on Algorand. This page displays a sample token called <code>PIXEL</code>.
      </p>
      <p>
        Before you can start interacting with <code>PIXEL</code> tokens, you need to opt-in.
      </p>
      <section className="content">
        <div className="buttons">
          <button className="button is-link" onClick={algorand.optIn}>Opt-in</button>
        </div>
      </section>
      <h4>Transfer</h4>
      <section className="content">
        <p>
          You can use this form to transfer <code>PIXEL</code> tokens to any recipient.
        </p>
        <div className="field">
          <label className="label">Asset Index</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Algorand Asset Index"
              value={state.assetIndex || ''}
              disabled
              onChange={onChangeAssetIndex}
            />
          </div>
        </div>
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
              <button className="button is-static">PIXEL</button>
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
      {/* <h4>Tenant</h4>
      <section className="content">
        <div className="buttons">
          <button className="button is-link" onClick={algorand.createFungibleToken}>Create</button>
        </div>
      </section> */}
      <section className="content">
        {algorand.hasTransactions &&
          <Transactions />
        }
      </section>
    </React.Fragment>
  );
}

export default Application;