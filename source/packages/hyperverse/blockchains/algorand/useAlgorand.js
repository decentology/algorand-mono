import {useContext} from 'react';

import Algorand from './context/Algorand.jsx';

function useAlgorand() {
  return useContext(Algorand);
}

export default useAlgorand;