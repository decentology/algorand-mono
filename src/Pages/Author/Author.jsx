import {Routes, Route} from 'react-router-dom';

import {Application} from './Application';
import {Applications} from './Applications';
import {Transaction} from './Transaction';

function Author(props) {
  return (
    <Routes>
      <Route path="/" element={<Application />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/transaction/*" element={<Transaction />} />
    </Routes>
  );
}

export {Author};