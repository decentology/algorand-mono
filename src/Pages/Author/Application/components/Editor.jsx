import React from 'react';
import {cx, css} from '@emotion/css';

import {Code} from '../../../../Components';

import {colors, breakpoints} from '../../../../utilities';

const styles = {
  container: css({
    gridColumnStart: '2',
    gridColumnEnd: '3',
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 1em 0',
    padding: '0 !important',
    [breakpoints.mobile]: {
      gridColumnStart: '1 !important',
      gridColumnEnd: '4 !important',
      borderRadius: '0px',
      borderWidth: '1px 0 1px 0',
    }
  }),
  lineNumbers: css({
    padding: '16px 8px 16px 16px',
    textAlign: 'right',
    color: colors.material.grey[400],
    backgroundColor: colors.material.grey[0],
    borderRadius: '4px 0 0 4px',
    border: `1px solid ${colors.material.grey[300]}`,
    borderRight: '0px',
    userSelect: 'none',
    [breakpoints.mobile]: {
      display: 'none',
    }
  }),
  textarea: css({
    display: 'block',
    width: '100%',
    padding: '16px 16px 16px 8px',
    color: colors.material.grey[900],
    backgroundColor: colors.material.grey[0],
    borderRadius: '0 4px 4px 0',
    border: `1px solid ${colors.material.grey[300]}`,
    borderLeft: '0px',
    lineHeight: '21px',
    fontSize: '14px',
    fontFamily: 'monospace',
    fontWeight: '400',
    outline: 'none',
    [breakpoints.mobile]: {
      padding: '16px 32px 16px 32px',
    }
  }),
};

function Editor(props) {
  if (props.isDeployable) {
    return (
      <Code
        source={props.source}
        language="TEAL"
        isDeployable={false}
      />
    );
  } else {
    return (
      <div className={cx(styles.container)}>
        <code
          className={cx(styles.lineNumbers)}
        >
          {props.source.split('\n').map((line, index) => {
            return (
              <div key={`line-number-${index}`}>
                {index + 1}
              </div>
            );
          })}
        </code>
        <textarea
          className={cx(styles.textarea)}
          value={props.source}
          rows={props.source.split('\n').length}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    );
  }
}

export {Editor};