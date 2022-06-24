import {cx, css} from '@emotion/css';

import {Icon} from '../Icons';
import {colors} from '../../utilities';

import * as commonStyles from './styles.js';

const styles = {
  container: css({
    position: 'relative',
  }),
  options: css({
    // fontWeight: '600',
  }),
  indicator: css({
    position: 'absolute',
    top: '9px',
    right: '16px',
  }),
};

function Options(props) {
  const onChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div className={cx(styles.container)}>
      <select
        className={cx(commonStyles.element, styles.options)}
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
      >
        <option disabled={props.value}>
          {props.placeholder}
        </option>
        {props.list && props.list.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
      <div className={cx(styles.indicator)}>
        <Icon
          name="ArrowDropDown"
          color={colors.material.grey[600]}
        />
      </div>
    </div>
  );
}

export {Options};