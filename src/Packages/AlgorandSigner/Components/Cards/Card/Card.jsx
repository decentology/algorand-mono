import React from 'react';
import {cx, css} from '@emotion/css';

import {Body} from './Body.jsx';
import {Feet} from './Feet.jsx';

const styles = {
  card: css({
    width: '100%',
    maxWidth: '100%',
    height: 'fit-content',
    paddingTop: '16px',
  }),
};

function Card(props) {
  let body = null;
  let feet = null;

  if (props.children instanceof Array) {
    body = props.children.find((element) => element.type === Body);
    feet = props.children.find((element) => element.type === Feet);
  }
  if (!body) {
    body = <Body>{props.children}</Body>;
  }

  return (
    <div className={cx(styles.card)}>
      {body}
      {feet}
    </div>
  );
}

export {Card};