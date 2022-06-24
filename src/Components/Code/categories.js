import {css} from '@emotion/css';

const categories = [
  {
    name: 'Space',
    scope: [
      'space', // [ ]
      'space.line', // [\n]
    ],
    style: css({
      color: 'red',
    })
  },
  {
    name: 'Invalid',
    scope: [
      'invalid.illegal.teal', // [\nint 0]
    ],
    style: css({
      color: '#d95468',
      textDecoration: 'line-through',
    })
  },
  {
    name: 'Opcode',
    scope: [
      'keyword.other.teal', // [int,byte,addr,...]
      'keyword.other.unit.teal', // [acct_params_get,app_global_del,app_global_get,...]
      'support.class.teal', // [base64,b64,...]
      'keyword.operator.teal', // [!,!=,%,...]
    ],
    style: css({
      color: '#00897b', // teal:600
    })
  },
  {
    name: 'Control',
    scope: [
      'keyword.control.teal', // [assert,b,bnz,bz,...]
    ],
    style: css({
      color: '#E91E63', // pink:500
    })
  },
  {
    name: 'Variable',
    scope: [
      'support.variable.teal', // bnz [initialize]
    ],
    style: css({
      color: '#3949ab', // indigo:600
      borderBottom: `1px solid #c5cae9`, // indigo:100
    })
  },
  {
    name: 'VariableColon',
    scope: [
      'support.variable.colon.teal', // initialize[:]
    ],
    style: css({
      color: '#3949ab', // indigo:600
    })
  },
  {
    name: 'Parameter',
    scope: [
      'variable.parameter.teal', // txn [OnCompletion]
    ],
    style: css({
      color: '#00BCD4', // cyan:500
    })
  },
  {
    name: 'Literal',
    scope: [
      'constant.numeric.teal', // [0,1,0x1f,...]
    ],
    style: css({
      color: '#2962ff', // blue:a700
    })
  },
  {
    name: 'Pragma',
    scope: [
      'support.function.teal', // [#pragma...]
    ],
    style: css({
      color: '#00bfa5', // deep orange:200
      // backgroundColor: '#e0f2f1',
    })
  },
  {
    name: 'Escaped',
    scope: [
      'constant.character.escape.teal', // [\x1f]
    ],
    style: css({
      color: '#ff5555',
    })
  },
  {
    name: 'Comment',
    scope: [
      'comment.line.double-slash.teal', // [// comment...]
    ],
    style: css({
      color: '#9e9e9e', // grey:500
      fontStyle: 'italic',
    })
  },
  {
    name: 'Bytes',
    scope: [
      'string.quoted.double.teal', // ["string",0x737472696e67]
      'string.quoted.triple.teal', // TODO: Find an example
      'string.unquoted.teal', // addr [ABCD1234...]
    ],
    style: css({
      color: '#37474f'
    })
  }
];

function findStyle(type) {
  const category = categories.find((category) => category.scope.includes(type));
  if (category) {
    return category.style;
  } else {
    return null;
  }
}

export {
  categories,
  findStyle
};