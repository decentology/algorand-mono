import React, {useReducer, useEffect} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import Page from '../../components/Page';

import Counter from './Counter.jsx';
import FungibleToken from './FungibleToken.jsx';
import Account from './Account.jsx';
import Transfers from './Transfers.jsx';

function reducer(state, action) {
  switch (action.type) {
    case 'setBalance': {
      return {
        ...state,
        balance: action.payload
      };
    }
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

const styles = StyleSheet.create({

});

function Playground(props) {
  const routeMatch = useRouteMatch();

  return (
    <Page>
      <Switch>
        <Route path={routeMatch.path} exact>
          <h3>Playground</h3>
          <p>
            This is a preview of the <strong>Hyperverse</strong> Playground where you will be able to interact with every smart module using an intuitive graphical UI.
          </p>
          <p>
            The idea behind this is to empower web developers by employing techniques that they're familiar with.
          </p>
        </Route>
        <Route path={`${routeMatch.path}/counter`}>
          <Counter />
        </Route>
        <Route path={`${routeMatch.path}/fungible-token`}>
          <FungibleToken />
        </Route>
        <Route path={`${routeMatch.path}/account`}>
          <Account />
        </Route>
        <Route path={`${routeMatch.path}/transfers`}>
          <Transfers />
        </Route>
      </Switch>
    </Page>
  );
}

export default Playground;