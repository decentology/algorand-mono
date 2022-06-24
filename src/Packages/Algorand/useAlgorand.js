import {useContext} from 'react';
import {Context} from './Algorand.jsx';

function useAlgorand() {
  const algorand = useContext(Context);

  return algorand;
}

export {useAlgorand};