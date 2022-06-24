import React from 'react';

import {Context} from './Context.jsx';

function useCards() {
  return React.useContext(Context);
}

export {useCards};