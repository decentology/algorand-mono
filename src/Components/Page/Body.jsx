import React from 'react';
import {cx, css} from '@emotion/css';
import {Outlet} from 'react-router-dom';

import Navigation, {Context as NavigationContext} from './Navigation';

import {colors} from '../../utilities/colors.js';

const styles = {
  body: css({
    boxSizing: 'border-box',
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.material.grey[50],
  }),
  content: css({
    flex: '1',
    display: 'grid',
    gridTemplateColumns: '32px [content] 1fr 32px',
    // Makes rows act like regular divs in a column flexbox.
    gridAutoRows: 'max-content',
    '& > *': {
      gridColumnStart: 'content',
      gridColumnEnd: 'content',
    },
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 0',
  }),
  contentIsHidden: css({
    display: 'none',
  })
};

function Body(props) {
  const navigation = React.useContext(NavigationContext);

  return (
    <div className={cx(styles.body)}>
      <Navigation />
      <div
        className={cx({
          [styles.content]: true,
          [styles.contentIsHidden]: navigation.isVisible
        })}
      >
        <Outlet />
      </div>
    </div>
  );
}

export {Body};