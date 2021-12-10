import React from 'react';
import {useLocation} from 'react-router-dom';

import Page from '../components/Page';

function Authentication(props) {
  const location = useLocation();

  return (
    <Page>
      Please connect your wallet in order to see this page.
    </Page>
  );
}

export default Authentication;