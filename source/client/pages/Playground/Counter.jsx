import React, {useEffect, useState} from 'react';

import {useAlgorand} from '../../../packages/hyperverse';
import {useCounter} from '../../../packages/hyperverse-counter';

import Transactions from '../../components/Algorand/Transactions';

function Counter(props) {
  const algorand = useAlgorand();
  const counter = useCounter();

  const [count, setCount] = useState(null);

  const updateCount = async () => {
    setCount(null);
    const nextCount = await counter.fetchCount();
    setCount(nextCount);
  };

  useEffect(() => {
    if (!algorand.hasPendingTransactions) {
      updateCount();
    }
  }, [algorand.hasPendingTransactions]);

  return (
    <React.Fragment>
      <h3>Counter</h3>
      <section className="content">
        <p>
          The <em>Counter</em> smart module allows users to interact with a single, global value by either adding or deducting <code>1</code>.
        </p>
        <section className="content">
          <div className="tags has-addons are-large">
            <span className="tag">Value</span>
            {count !== null &&
              <span className="tag is-info">{count}</span>
            }
            {count === null &&
              <span className="tag is-dark">Loading...</span>
            }
          </div>
        </section>
        <p>
          By using these buttons you can interact with the <em>Counter</em> app.
        </p>
        <div className="buttons">
          <button className="button is-link" onClick={counter.add}>Add</button>
          <button className="button is-link" onClick={counter.deduct}>Deduct</button>
        </div>
        <p>
          While this button is here to manually fetch the latest value that's on Algorand.
        </p>
        <div className="buttons">
          <button className="button is-link" onClick={updateCount}>Update count</button>
        </div>
      </section>
      {/* <section className="content">
        <h4>Tenant</h4>
        <div className="buttons">
          <button className="button is-link" onClick={counter.bundle.deploy}>Deploy Application</button>
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

export default Counter;