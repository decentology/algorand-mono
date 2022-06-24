// import {Link} from 'react-router-dom';

// import {colors} from '../utilities';

import {Markdown} from '../Components/Markdown.jsx';

const content = String.raw`
#### Motivation

I love [Algorand](https://www.algorand.com/)! I want to love the process of building things on Algorand, which is why I'm building [Algorand.dev](https://algorand.dev/) - the unofficial Algorand developer resources. But *why*..?

There's an old quote by [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay).

> People who are really serious about software should make their own hardware.

I'm serious about Algorand, so I decided to make my own developer tools. Who knows, maybe they will help others.

#### Structure

I've compiled a list of external [Resources](/resources) to get started (if you want to see a link added, please email me at [morgan@algorand.dev](mailto:morgan@algorand.dev)).

I'm exploring [TEAL](/teal) and how to build DApps that run on Algorand, and I'll keep posting what I learn there.

Finally, I'll talk about [The Hyperverse](/hyperverse) which will enable web developers to quickly jump into Algorand without havint to learn TEAL.

Let's go! 🚀
`;

function Home(props) {
  return (
    <>
      <h1 className="title">Algorand Developer</h1>
      <h2 className="subtitle">
        The <em>unofficial</em> developer resource
      </h2>
      <Markdown>
        {content}
      </Markdown>
    </>
  );
}

export {Home};