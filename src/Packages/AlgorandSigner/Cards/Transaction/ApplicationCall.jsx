import React from 'react';
import {cx, css} from '@emotion/css';

import {useAlgorand} from '../../../Algorand/useAlgorand.js';
import {Transaction} from '../../Model';

import {Context as SignerContext} from '../../Context.jsx';

import {useCards} from '../../Components/Cards';
import {Card, Body, Feet} from '../../Components/Cards/Card';
import {Details, Detail} from '../../Components';
import {Button} from '../../../../Components/Button.jsx';

import {Source} from '../Source.jsx';
import {MobileWalletPrompt} from '../MobileWalletPrompt.jsx';
import {Signature} from '../Signature.jsx';

import {colors} from '../../../../utilities';

const styles = {
  title: css({
    margin: '0px 0 0 0px',
    color: colors.material.grey[800],
    fontSize: '20px',
    fontWeight: '500',
  }),
  titleWithoutSubtitle: css({
    marginBottom: '16px',
  }),
  subtitle: css({
    margin: '0 0 16px 0px',
    color: colors.material.grey[600],
    fontSize: '16px',
  }),
  table: css({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    margin: '0 0 16px 0',
    padding: '4px',
    borderRadius: '8px',
    backgroundColor: colors.material.grey[200],
    '& > div:nth-child(2n)': {
      justifyContent: 'flex-end',
    }
  }),
  cell: css({
    display: 'flex',
    alignItems: 'center',
    padding: '4px 4px',
    borderRadius: '6px',
  }),
  cellTitle: css({
    paddingLeft: '8px',
    color: colors.material.grey[600],
    fontWeight: '500',
  }),
};

function ApplicationCall(props) {
  const algorand = useAlgorand();
  const transaction = algorand.state.preparedTransactions[0];
  const signer = React.useContext(SignerContext);
  const cards = useCards();

  const addressStart = transaction.from.slice(0, 8);
  const addressEnd = transaction.from.slice(50);

  const type = Transaction.types.find((candidate) => candidate.type === transaction.type);

  const onApplicationComplete = Transaction.actions[transaction.appOnComplete];

  const currentRound = signer.round || transaction.firstRound;
  const numberOfRounds = transaction.lastRound - currentRound;

  const onViewApprovalProgram = () => {
    cards.navigateTo({
      component: Source,
      props: {
        title: 'Approval Program',
        code: props.transaction.approvalCode,
        type: 'ApprovalProgram',
      }
    });
  };

  const onViewClearProgram = () => {
    cards.navigateTo({
      component: Source,
      props: {
        title: 'Clear Program',
        code: props.transaction.clearCode,
        type: 'ClearProgram',
      }
    });
  };

  const onSign = async () => {
    if (signer.walletURL) {
      algorand.sign(transaction);
      cards.navigateTo({
        component: Signature,
        props: {
          title: 'Transaction'
        }
      });
    } else {
      cards.navigateTo({
        component: MobileWalletPrompt,
        props: {
          title: 'Signature Requested'
        }
      });
    }
  };

  return (
    <Card>
      <Body>
        <h1 className={cx(styles.title, styles.titleWithoutSubtitle)}>
          {type.title}
        </h1>
        <div className={cx(styles.table)}>
          <div className={cx(styles.cell, styles.cellTitle)}>From</div>
          <div className={cx(styles.cell)}>
            <Button isExternal href={algorand.linkTo('account', algorand.state.account)}>
              {addressStart}&nbsp;&hellip;&nbsp;{addressEnd}
            </Button>
          </div>
          <div className={cx(styles.cell, styles.cellTitle)}>First round</div>
          <div className={cx(styles.cell)}>
            <Button isExternal href={algorand.linkTo('block', transaction.firstRound)}>
              #{transaction.firstRound}
            </Button>
          </div>
        </div>

        <div className={cx(styles.table)} style={{backgroundColor: colors.material.teal[50]}}>
          <div className={cx(styles.cell, styles.cellTitle)}>Approval program</div>
          <div className={cx(styles.cell)}>
            <Button isNavigable={true} onClick={onViewApprovalProgram}>
              View
            </Button>
          </div>
          <div className={cx(styles.cell, styles.cellTitle)}>Clear program</div>
          <div className={cx(styles.cell)}>
            <Button isNavigable={true} onClick={onViewClearProgram}>
              View
            </Button>
          </div>
        </div>

        <Details>
          <Detail icon="CheckCircle">
            <strong>{onApplicationComplete.title}</strong>&nbsp;<em>(when completed)</em>
          </Detail>
          <Detail icon="Toll">
            <strong>{transaction.fee}</strong>&nbsp; microalgo fee
          </Detail>
          <Detail icon="HourglassTop" isActive={numberOfRounds > 0}>
            {numberOfRounds > 0 && 
              <>Valid for another &nbsp;<strong>{numberOfRounds}</strong>&nbsp; round{numberOfRounds > 1 ? 's' : ''}</>
            }
            {numberOfRounds <= 0  &&
              <><span className="tag is-warning">Transaction has expired</span></>
            }
          </Detail>
        </Details>
      </Body>
      <Feet>
        <Button
          title="Sign"
          href={signer.walletURL}
          onClick={onSign}
        />
      </Feet>
    </Card>
  );
}

export {ApplicationCall};