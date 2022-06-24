import React from 'react';
import {cx, css, keyframes} from '@emotion/css';

import {Icon} from '../../../Components';

import {colors} from '../../../utilities';

const animations = {
  rotation: keyframes({
    '0%': {
      transform: 'rotateZ(0deg)',
    },
    '50%': {
      transform: 'rotateZ(360deg)',
    },
    '100%': {
      transform: 'rotateZ(360deg)',
    }
  }),
};

const styles = {
  details: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  detail: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '4px 0',
  }),
  detailIsActive: css({
    animation: `${animations.rotation} 2s ease-in-out infinite 1s`,
  }),
  icon: css({
    margin: '0 8px 0 0',
    padding: '2px',
    borderRadius: '4px',
    backgroundColor: colors.material.grey[200],
  }),
  value: css({
    padding: '2px 0 0 0',
    color: colors.material.grey[700],
  }),
};

function Detail(props) {
  return (
    <div className={cx(styles.detail)}>
      <div
        className={cx({
          [styles.icon]: true,
          [styles.detailIsActive]: props.isActive
        })}
      >
        <Icon
          name={props.icon}
          color={colors.material.grey[500]}
        />
      </div>
      <div className={cx(styles.value)}>
        {props.children}
      </div>
    </div>
  );
}

function Details(props) {
  return (
    <div className={cx(styles.details)}>
      {props.children}
    </div>
  );
}

export {Details, Detail};