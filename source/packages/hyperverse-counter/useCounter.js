import React from 'react';

import {Context} from './Provider.jsx';

function useCounter() {
  const context = React.useContext(Context);
  return context;
}

export default useCounter;