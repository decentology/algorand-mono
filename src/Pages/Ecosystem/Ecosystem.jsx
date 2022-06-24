import React from 'react';

import {Markdown} from '../../Components';
import {Breadcrumbs} from '../../Components/Page';

const content = `
The Algorand token price and market cap are not great ways to judge the health of the Algorand ecosystem. This is an experiment to find metrics that give real insights.
`;

const metrics = [
  {title: ''}
];

function Ecosystem(props) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="title">Ecosystem Report</h1>
      <h2 className="subtitle">Algorand metrics that matter</h2>
      <Markdown>
        {content}
      </Markdown>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </>
  );
}

export {Ecosystem};