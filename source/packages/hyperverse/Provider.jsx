import React from 'react';

import * as Algorand from './blockchains/algorand';

const Context = React.createContext(null);

function Provider(props) {
  const [hyperverse, setHyperverse] = React.useState(null);
  
  React.useEffect(() => {
    props.hyperverse.then((hyperverse) => setHyperverse(hyperverse));
  }, [props.hyperverse]);
  
  if (hyperverse) {
    if (hyperverse.blockchain === 'Algorand') {
      let children = props.children;
      for (const module of hyperverse.modules) {
        children = React.createElement(
          module.bundle.Provider,
          {
            blockchain: hyperverse.blockchain,
            network: hyperverse.network,
            tenantID: module.tenantID
          },
          children
        );
      }
      return (
        <Context.Provider value={hyperverse}>
          <Algorand.Provider>
            {children}
          </Algorand.Provider>
        </Context.Provider>
      );
    }
  } else {
    return null;
  }
}

export {
  Context,
  Provider
};