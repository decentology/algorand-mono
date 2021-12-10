import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import {colors} from '../../../utilities';

const defaults = {
  color: colors.grey[800],
  length: 24
};

const styles = StyleSheet.create({
  Icon: {
    display: 'block'
  }
});

function Icon(props) {
  const length = props.size || defaults.length;

  return (
    <svg
      className={css(styles.Icon)}
      style={{
        width: `${length}px`,
        height: `${length}px`,
        fill: props.color || defaults.color
      }}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={`#${props.name}Icon`} />
    </svg>
  );
}

export default Icon;