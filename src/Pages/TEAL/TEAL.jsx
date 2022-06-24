import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';

import * as Sections from './Sections';

function TEAL(props) {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<Sections.Home />} />
        <Route path="draft" element={<Sections.Draft />} />
        <Route path="fundamentals" element={<Sections.Fundamentals />} />
      </Route>
    </Routes>
  );
}

export {TEAL};