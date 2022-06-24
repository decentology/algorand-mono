import {cx} from '@emotion/css';

import * as commonStyles from './styles.js';

function Textarea(props) {
  const onChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <textarea
      className={cx(commonStyles.element)}
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      rows={props.lines || 4}
      onChange={onChange}
    />
  );
}

export {Textarea};