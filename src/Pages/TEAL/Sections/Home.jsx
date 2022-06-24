import React from 'react';

import {Markdown} from '../../../Components';
import {Breadcrumbs} from '../../../Components/Page';

const content = `
- \`2022-04-20\` - [Fundamentals](/teal/fundamentals).

   Introduction to basic concepts, code samples, stack, deployment.

- \`2022-04-19\` - [Draft](/teal/draft).

   First draft of what a TEAL post could look like.
`;

function Home(props) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="title">TEAL</h1>
      <h2 className="subtitle">A place to learn more about how TEAL works</h2>
      <Markdown>
        {content}
      </Markdown>
    </>
  );
}

export {Home};