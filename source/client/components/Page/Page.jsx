import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import Navigation from './Navigation.jsx';

const styles = StyleSheet.create({
  Page: {
    display: 'flex',
    flexDirection: 'column',
  }
});

function Page(props) {
  return (
    <article className={css(styles.Page)}>
      <Navigation />
      <div className="content">
        {props.children}
      </div>
    </article>
  );
}

export default Page;