import React from 'react';
import {cx} from '@emotion/css';

import {useAlgorand} from '../../Algorand/useAlgorand.js';

import {Button} from '../../../Components';
import {LoadingIndicator} from '../Components';
import {Card, Body, Feet} from '../Components/Cards/Card';

function Signature(props) {
  const algorand = useAlgorand();
  const transaction = algorand.state.preparedTransactions[0];
  const recalculateHeights = props.calculateCardHeights;

  const onClose = () => {
    algorand.flushTransactions();
  };

  React.useEffect(() => {
    recalculateHeights();
  }, [recalculateHeights, transaction]);

  return (
    <Card>
      <Body>
        {transaction.state < 3 &&
          <LoadingIndicator message="Waiting for signature..." />
        }
        {transaction.state === 3 &&
          <LoadingIndicator message="Waiting for execution..." />
        }
        {transaction.state === 4 &&
          <div className="notification is-success">
            Transaction executed successfully!
          </div>
        }
        {transaction.state === 5 &&
          <div
            className={cx({
              'notification': true,
              'is-warning': transaction.error.severity === 'medium',
              'is-danger': transaction.error.severity === 'high',
            })}
          >
            {transaction.error.message}
          </div>
        }
      </Body>
      {transaction.state >= 4 &&
        <Feet>
          <Button
            title="Close"
            onClick={onClose}
          />
          {transaction.state === 4 &&
            <Button
              title="Explore"
              isExternal
              href={algorand.linkTo('transaction', transaction.ID)}
            />
          }
        </Feet>
      }
    </Card>
  );
}

export {Signature};