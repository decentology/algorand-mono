import {cx, css} from '@emotion/css';

const styles = {
  isPadded: css({
    padding: '0 16px 16px 16px',
  }),
};

function Body(props) {
  return (
    <div
      className={cx({
        [styles.isPadded]: typeof props.isPadded === 'undefined' ? true : props.isPadded
      })}
    >
      {props.children}
    </div>
  );
}

export {Body};