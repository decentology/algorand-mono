import {cx, css} from '@emotion/css';

import {colors, breakpoints} from '../../../../../utilities';

const styles = {
  feet: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '0',
    padding: '16px',
    borderTop: `1px solid ${colors.material.grey[300]}`,
    '& > *': {
      marginRight: '16px',
    },
    '& > *:last-child': {
      marginRight: '0px',
    },
    [breakpoints.mobile]: {
      justifyContent: 'center',
    }
  }),
};

function Feet(props) {
  return (
    <div className={cx(styles.feet)}>
      {props.children}
    </div>
  );
}

export {Feet};