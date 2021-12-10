import React, {useReducer, useEffect} from 'react';
import classNames from 'classnames';

import {useAlgorand} from '../../../packages/hyperverse';
import {useMounted} from '../../utilities';

function reducer(state, action) {
  switch (action.type) {
    case 'setBalance': {
      return {
        ...state,
        balance: action.payload
      };
    }
    case 'startWaiting': {
      return {
        ...state,
        isWaiting: true
      };
    }
    case 'stopWaiting': {
      return {
        ...state,
        isWaiting: false
      };
    }
    default:
      return state;
  }
}

function Account(props) {
  const algorand = useAlgorand();
  const isMounted = useMounted();
  const [state, dispatch] = useReducer(reducer, {
    balance: null,
    isWaiting: false
  });

  const fetchBalance = async () => {
    dispatch({type: 'startWaiting'});
    const response = await algorand.fetchAccount();
    if (isMounted.current) {
      dispatch({
        type: 'setBalance',
        payload: response.account.amount / 1000000
      });
      dispatch({type: 'stopWaiting'});
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <React.Fragment>
      <h3>Account</h3>
      <section className="content">
        <div className="field">
          <label className="label">Your Algo Balance</label>
          <div className="field has-addons">
            <div className="control">
              <button className="button is-static">Algo</button>
            </div>
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="fetch..."
                value={state.balance || ''}
                readOnly
              />
            </div>
            <div className="control">
              <button
                className={classNames({
                  'button': true,
                  'is-link': true,
                  'is-loading': state.isWaiting
                })}
                onClick={fetchBalance}
                disabled={state.isWaiting}
              >
                Fetch
              </button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Account;