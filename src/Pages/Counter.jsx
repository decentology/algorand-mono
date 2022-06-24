import * as Counter from '../Packages/AlgorandCounter';

import {Breadcrumbs} from '../Components/Page';

function Page() {
  const counter = Counter.useCounter();

  if (counter) {
    return (
      <>
        <Breadcrumbs />
        <h1 className="title">Algorand Counter</h1>
        <h2 className="subtitle">My experimental application for testing all kinds of things I learn about TEAL.</h2>
        <ul>
          <li>
            <button onClick={counter.deploy}>Deploy</button>
          </li>
          <li>
            <button onClick={counter.redeploy}>Redeploy</button>
          </li>
          <li>
          <button onClick={counter.add}>Add</button>
          </li>
          <li>
            <button onClick={counter.addABI}>Add ABI</button>
          </li>
        </ul>
      </>
    );
  } else {
    return null;
  }
}

export {Page as Counter};