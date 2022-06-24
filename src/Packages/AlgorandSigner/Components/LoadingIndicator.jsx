import {cx, css, keyframes} from '@emotion/css';

import {Icon} from '../../../Components';

import {colors} from '../../../utilities';

const animations = {
  active: keyframes({
    'from': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 0%',
    },
    'to': {
      backgroundPosition: '0% 0%',
    }
  }),
  rotation: keyframes({
    'from': {
      transform: 'rotateZ(0deg)',
    },
    'to': {
      transform: 'rotateZ(360deg)',
    }
  }),
};

const styles = {
  indicator: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  wrapper: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '10px',
  }),
  icon: css({
    transform: 'rotateZ(0deg)',
    animation: `${animations.rotation} 2s linear infinite`,
  }),
  message: css({
    color: colors.material.blueGrey[600],
  }),
};

function LoadingIndicator(props) {
  return (
    <div
      className={cx({
        [styles.indicator]: true
      })}
    >
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.icon)}>
          <Icon
            name="Settings"
            size={48}
            color={colors.material.blueGrey[400]}
          />
        </div>
        <div className={cx(styles.message)}>
          {props.message}
        </div>
      </div>
    </div>
  );
}

export {LoadingIndicator};