import {useContext} from 'react';
import {Context} from './Counter.jsx';

function useCounter() {
  const counter = useContext(Context);

  return counter;
}

export {useCounter};