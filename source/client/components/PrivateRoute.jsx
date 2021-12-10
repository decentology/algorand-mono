import React, {useContext} from 'react';
import {Route, Redirect, useLocation} from 'react-router-dom';

import {useAlgorand} from '../../packages/hyperverse';

function PrivateRoute(props) {
  const location = useLocation();
  const algorand = useAlgorand();

  if (algorand.state.isInitialized) {
    if (algorand.isConnected) {
      return (
        <Route {...props} />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/connect',
            state: {
              from: location.pathname
            }
          }}
        />
      );
    }
  } else {
    return (
      <div>Initializing...</div>
    );
  }
}

export default PrivateRoute;