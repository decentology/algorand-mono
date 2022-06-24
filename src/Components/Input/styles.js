import {css} from '@emotion/css';

import {colors} from '../../utilities';

const element = css({
  width: '100%',
  margin: '0 0 8px 0',
  padding: '12px 16px',
  backgroundColor: colors.material.grey[0],
  border: `1px solid`,
  borderColor: `transparent transparent ${colors.material.grey[400]} transparent`,
  borderRadius: '6px',
  boxShadow: `0 0px 4px -2px ${colors.material.grey[800]}`,
  color: colors.material.grey[800],
  WebkitAppearance: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
  outline: 'none',
  transition: 'box-shadow 250ms',
  '&:focus': {
    border: `1px solid ${colors.material.grey[800]}`,
    boxShadow: `0 4px 8px -6px ${colors.material.grey[800]}`,
  }
});

export {element};