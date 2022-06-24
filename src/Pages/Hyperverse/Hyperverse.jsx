import React from 'react';

import {Markdown} from '../../Components';
import {Breadcrumbs} from '../../Components/Page';

const content = `
*Coming soon...*
`;

function Hyperverse(props) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="title">The Hyperverse</h1>
      <h2 className="subtitle">A decentralized smart module marketplace</h2>
      <Markdown>
        {content}
      </Markdown>
    </>
  );
}

export {Hyperverse};