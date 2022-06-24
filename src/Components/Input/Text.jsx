import {cx} from '@emotion/css';

import * as commonStyles from './styles.js';

function Text(props) {
  const onChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <input
      className={cx(commonStyles.element)}
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={onChange}
    />
  );
}

export {Text};