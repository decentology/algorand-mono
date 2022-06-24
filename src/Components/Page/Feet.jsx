import {cx, css} from '@emotion/css';

import {colors} from '../../utilities';

const styles = {
  feet: css({
    boxSizing: 'border-box',
    padding: '32px 32px 64px 32px',
    borderTop: `1px solid ${colors.material.grey[300]}`,
    backgroundColor: colors.material.grey[50],
  }),
};

function Feet(props) {
  return (
    <div className={cx(styles.feet)}>
      Built by
      {' '}
      <a href="https://www.hyperverse.dev">
        Morgan Wilde
      </a>
    </div>
  );
}

export {Feet};