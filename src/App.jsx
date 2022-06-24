import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Provider as AlgorandProvider} from './Packages/Algorand';
import * as Counter from './Packages/AlgorandCounter';

import * as Pages from './Pages';

import {Page} from './Components';

function App(props) {
  return (
    <Page />
  );
}

function WrappedApp(props) {
  return (
    <BrowserRouter>
      <AlgorandProvider
        modules={[
          {
            bundle: Counter
          }
        ]}
      >
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Pages.Home />} />
            <Route path="/ecosystem" element={<Pages.Ecosystem />} />
            <Route path="/resources" element={<Pages.Resources />} />
            <Route path="/teal/*" element={<Pages.TEAL />} />
            <Route path="/hyperverse" element={<Pages.Hyperverse />} />
            <Route path="/counter" element={<Pages.Counter />} />
            <Route path="/author/*" element={<Pages.Author />} />
          </Route>
        </Routes>
      </AlgorandProvider>
    </BrowserRouter>
  );
}

export default WrappedApp;