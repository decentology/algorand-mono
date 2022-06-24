import React from 'react';
import {cx, css} from '@emotion/css';

import {Icon} from './Icons/Icon.jsx';

import {colors} from '../utilities';

const styles = {
  button: css({
    padding: '8px 16px',
    background: `linear-gradient(${colors.material.grey[0]}, ${colors.material.grey[50]})`,
    color: colors.material.grey[800],
    borderRadius: '6px',
    border: `1px solid ${colors.material.grey[400]}`,
    boxShadow: `0 2px 8px -6px ${colors.material.grey[800]}`,
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    '&:hover': {
      background: `linear-gradient(${colors.material.grey[0]}, ${colors.material.grey[0]})`,
      boxShadow: `0 2px 2px -6px ${colors.material.grey[800]}`,
    }
  }),
  isFlat: css({
    background: 'transparent',
    border: '1px solid transparent',
    boxShadow: 'none',
  }),
  isIcon: css({
    padding: '8px',
    background: 'transparent',
    border: '1px solid transparent',
    boxShadow: 'none',
  }),
};

function Button(props) {
  const onClick = (event) => {
    if (props.onClick) {
      if (props.href) {
        event.preventDefault();
        props.onClick();
        window.location = props.href;
      } else {
        props.onClick();
      }
    }
  };

  let element = 'button';
  let customProps = {};
  if (props.href) {
    element = 'a';
    if (props.isExternal) {
      customProps.target = '_blank';
    }
  }

  return (
    React.createElement(
      element,
      {
        className: cx({
          [styles.button]: true,
          [styles.isFlat]: props.isFlat,
          [styles.isIcon]: props.isIcon
        }),
        href: props.href,
        ...customProps,
        onClick
      },
      <>
        {props.children || props.title}
        {props.isNavigable &&
          <Icon
            name="ChevronRight"
            color={colors.material.grey[400]}
            size={26}
            style={{
              display: 'inline-block',
              margin: '-8px -8px -8px 0px',
            }}
          />
        }
      </>
    )
  );
}

export {Button};