import React from 'react';

import {Card} from '../Components/Cards';
import {Code} from '../../../Components';

import {colors} from '../../../utilities';

function Source(props) {
  let background = null;
  switch (props.type) {
    case 'ApprovalProgram': {
      background = colors.material.lime[50];
      break;
    }
    case 'ClearProgram': {
      background = colors.material.amber[50];
      break;
    }
    default:
      background = null;
  }

  return (
    <Card
      isPadded={false}
    >
      <Code
        language="TEAL"
        source={props.code}
        isSanitized={false}
        isTight={true}
        background={background}
      />
    </Card>
  );
}

export {Source};