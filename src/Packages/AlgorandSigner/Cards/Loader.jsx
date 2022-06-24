import React from 'react';

import {LoadingIndicator, Card} from '../Components';

function Loader(props) {
  return (
    <Card>
      <LoadingIndicator message="building&hellip;" />
    </Card>
  );
}

export {Loader};