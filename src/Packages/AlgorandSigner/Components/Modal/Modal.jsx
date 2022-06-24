import React from 'react';
import {cx, css} from '@emotion/css';

import {Context as CardsContext} from '../Cards';
import {Icon, Button} from '../../../../Components';

import {colors, breakpoints} from '../../../../utilities';

const styles = {
  modal: css({
    zIndex: '1000',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    backgroundColor: 'rgba(33, 33, 33, 0.75)',
    [breakpoints.mobile]: {
      alignItems: 'flex-end',
    }
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    maxWidth: '800px',
    maxHeight: '100%',
    padding: '0',
    backgroundColor: colors.material.grey[50],
    boxShadow: `0 4px 12px 4px ${colors.material.grey[800]}`,
    borderRadius: '4px',
    overflowY: 'auto',
  }),
  head: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 8px 8px 8px',
    backgroundColor: colors.material.grey[200],
  }),
  title: css({
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    color: colors.material.grey[800],
    fontSize: '20px',
    fontWeight: '500',
  }),
  hasBackButton: css({
    paddingLeft: '0',
    cursor: 'pointer',
    userSelect: 'none',
    '&:focus': {
      outline: 0,
    }
  }),
  body: css({
    width: '100%',
    margin: '0',
    padding: '0',
    overflowY: 'auto',
  }),
};

function Modal(props) {
  const cards = React.useContext(CardsContext);
  const onClose = () => {
    props.onClose();
  };

  const canNavigateBack = cards.state.cards.length > 1 && cards.state.isTransitioning !== 'backward';

  const onNavigateBack = () => {
    if (canNavigateBack) {
      cards.navigateBack();
    }
  };

  return (
    <div className={cx(styles.modal)}>
      <div className={cx(styles.content)}>
        <div className={cx(styles.head)}>
          <h1
            className={cx({
              [styles.title]: true,
              [styles.hasBackButton]: canNavigateBack
            })}
            onClick={onNavigateBack}
          >
            {canNavigateBack &&
              <Icon name="ChevronLeft" color={colors.material.grey[800]} />
            }
            {cards.currentCard ? cards.currentCard.props.title : 'Transaction'}
          </h1>
          <Button isIcon onClick={onClose}>
            <Icon name="Close" color={colors.material.grey[800]} />
          </Button>
        </div>
        <div className={cx(styles.body)}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export {Modal};