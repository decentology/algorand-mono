import React from 'react';

import Page from '../components/Page';

function Documentation(props) {
  return (
    <Page>
      <h3>Documentation</h3>
      <p>Helpful snippets for building DApps on Algorand using the Hyperverse.</p>
      <h4>Fix Mobile Safari</h4>
      <p>
        Our Algorand Wallet integration doesn't work on iOS with defaults enabled. To fix this, you need to follow these steps.
      </p>
      <ol>
        <li>Settings</li>
        <li>Safari</li>
        <li>Advanced</li>
        <li>Experimental Features</li>
        <li>
          Turn <strong>off</strong> <em>NSURLSession WebSocket</em>
        </li>
      </ol>
    </Page>
  );
}

export default Documentation;