import React from 'react';

import Page from '../components/Page';

function Home(props) {
  return (
    <Page>
      <p>
        As a web developer, can you build decentralized applications even without knowing how to write smart contracts? I believe, the answer should be <strong>YES</strong>.
      </p>
      <p>
        Unfortunately, that's not the case right now. Before we can onboard billions of people to blockchain, we first need to onboard millions of developers. This is not a chicken and egg problem, killer apps need to be built first, then users will arrive.
      </p>
      <p>
        We hope to onboard millions of web developers to blockchain by creating a marketplace for composable smart modules. This will allow web developers to decentralize their apps, without asking them to learn anything new.
      </p>
      <p>
        This is the future guide to the <strong>Hyperverse</strong> for web developers building DApps using <strong>Algorand</strong>.
      </p>
      <h4>Hyperverse</h4>
      <p>
        We're using npm modules with popular <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">React</a> interfaces to provide access to the <a href="https://www.decentology.com/hyperverse" target="_blank">Hyperverse</a> and various smart modules on it.
      </p>
      <article className="message">
        <div className="message-body">
          This project is still in pre-alpha. If you would like to be the first to learn when we launch the alpha version of Hyperverse for Algorand, please send an email to <a href="mailto:morgan@algorand.dev?subject=Hyperverse alpha">morgan@algorand.dev</a>. You can also follow <a href="https://twitter.com/algorand_dev" target="_blank">@algorand_dev</a> on Twitter for more rapid progress updates.
        </div>
      </article>
    </Page>
  );
}

export default Home;