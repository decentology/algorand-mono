import React, {useContext} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {Link} from 'react-router-dom';

import Context from './Context.jsx';

import {Icon} from '../../components/Icons';

const styles = StyleSheet.create({
  Head: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1.5rem'
  },
  left: {
    flex: '1',
  },
  right: {
    
  },
});

function Head(props) {
  const context = useContext(Context);

  return (
    <nav className={css(styles.Head)}>
      <div className={css(styles.left)}>
        <h1 className="title">
          <Link className="has-text-info" to="/">Algorand.dev</Link>
        </h1>
        <h2 className="subtitle">
          The <strong>unofficial</strong> developer hub.
        </h2>
      </div>
      <div className={css(styles.right)}>
        <button
          className="button is-info is-light"
          onClick={context.toggle}
        >
          {context.isVisible &&
            <Icon name="Close" color="#296fa8" />
          }
          {!context.isVisible &&
            <Icon name="Menu" color="#296fa8" />
          }
        </button>
      </div>
    </nav>
  );
}

export default Head;