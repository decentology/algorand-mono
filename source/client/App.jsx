import React, {useEffect} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {BrowserRouter, Switch, Route, Link, useHistory, useLocation} from 'react-router-dom';

import * as Hyperverse from '../packages/hyperverse';
import * as HyperverseCounter from '../packages/hyperverse-counter';

import PrivateRoute from './components/PrivateRoute.jsx';

import Icons, {Icon} from './components/Icons';
import Head, {Provider as HeadProvider} from './components/Head';
import Footer from './components/Footer.jsx';
import {Provider as DeviceDetectProvider} from './utilities/DeviceDetect.js';

import Home from './pages/Home.jsx';
import Authentication from './pages/Authentication.jsx';
import Playground from './pages/Playground';
import Documentation from './pages/Documentation.jsx';

const hyperversePromise = Hyperverse.initialize({
  blockchain: Hyperverse.blockchains.Algorand,
  network: Hyperverse.networks.TestNet,
  modules: [
    {bundle: HyperverseCounter, tenantID: '123'}
  ]
});

const styles = StyleSheet.create({
  App: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  Body: {
    flex: '1',
    width: '100%',
    maxWidth: '960px',
    margin: 'auto',
  }
});

function App(props) {
  const algorand = Hyperverse.useAlgorand();
  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    // If the user connects their account after a redirect, take them back to
    // their original destination.
    if (algorand.state.account && location.state && location.state.from) {
      history.push(location.state.from);
    }
  }, [algorand.state.account, location]);

  return (
    <React.Fragment>
      <Icons />
      <div className={css(styles.App)}>
        <div className={css(styles.Body)}>
          <section className="section">
            <Head />
            <Switch>
              <Route path="/connect">
                <Authentication />
              </Route>
              <PrivateRoute path="/playground">
                <Playground />
              </PrivateRoute>
              <Route path="/documentation">
                <Documentation />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </section>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

function WrappedApp(props) {
  return (
    <BrowserRouter>
      <DeviceDetectProvider>
        <Hyperverse.Provider hyperverse={hyperversePromise}>
          <HeadProvider>
              <App />
          </HeadProvider>
        </Hyperverse.Provider>
      </DeviceDetectProvider>
    </BrowserRouter>
  );
}

export default WrappedApp;