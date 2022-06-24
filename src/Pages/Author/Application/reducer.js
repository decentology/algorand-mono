const constants = {
  validIntegers: '0123456789'.split(''),
};

function convertToInteger(value) {
  let integer = '';
  for (const character of value) {
    if (constants.validIntegers.includes(character)) {
      if (character === '0' && integer.length === 0) {
        continue;
      }
      integer = `${integer}${character}`;
    }
  }
  
  return integer.length === 0 ? '0' : integer;
}

function reducer(state, action) {
  switch (action.type) {
    case 'setGlobalIntegers': {
      return {
        ...state,
        globalIntegers: convertToInteger(action.payload)
      };
    }
    case 'setGlobalBytes': {
      return {
        ...state,
        globalBytes: convertToInteger(action.payload)
      };
    }
    case 'setLocalIntegers': {
      return {
        ...state,
        localIntegers: convertToInteger(action.payload)
      };
    }
    case 'setLocalBytes': {
      return {
        ...state,
        localBytes: convertToInteger(action.payload)
      };
    }
    case 'setCode': {
      return {
        ...state,
        code: action.payload
      };
    }
    case 'setTitle': {
      return {
        ...state,
        title: action.payload
      };
    }
    case 'toggleDeployable': {
      return {
        ...state,
        isDeployable: !state.isDeployable
      };
    }
    case 'setApplicationID': {
      return {
        ...state,
        applicationID: action.payload
      };
    }
    default:
      return state;
  }
}

export {reducer};