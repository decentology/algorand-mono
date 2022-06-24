import React from 'react';
import {cx, css} from '@emotion/css';

import {Context} from './Context.jsx';

import {Button} from '../Button.jsx';
import {Icon} from '../Icons/Icon.jsx';

import {colors, breakpoints} from '../../utilities';

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
    flex: '1',
    maxWidth: '1024px',
    maxHeight: '100%',
    padding: '0',
    backgroundColor: colors.material.grey[50],
    borderRadius: '4px',
    overflowY: 'auto',
  }),
  head: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 8px 8px 16px',
    backgroundColor: colors.material.grey[200],
  }),
  title: css({
    flex: '1',
    color: colors.material.grey[800],
    fontSize: '20px',
    fontWeight: '500',
  }),
  body: css({
    margin: '0',
    padding: '16px',
    overflowX: 'scroll',
  }),
  feet: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '0',
    padding: '16px',
    borderTop: `1px solid ${colors.material.grey[300]}`,
    [breakpoints.mobile]: {
      justifyContent: 'center',
    }
  }),
};

function Modal(props) {
  const context = React.useContext(Context);
  const onClose = () => {
    context.toggle();
  };

  if (context.isVisible) {
    return (
      <div className={cx(styles.modal)}>
        <div className={cx(styles.content)}>
          <div className={cx(styles.head)}>
            <h1 className={cx(styles.title)}>
              {context.state.title}
            </h1>
            <Button isIcon onClick={onClose}>
              <Icon name="Close" color={colors.material.grey[800]} />
            </Button>
          </div>
          <div className={cx(styles.body)}>
            {context.state.body}
          </div>
          {context.state.actions &&
            <div className={cx(styles.feet)}>
            {context.state.actions.map((action, index) => {
              return (
                <Button
                  key={index}
                  title={action.title}
                  onClick={action.trigger}
                />
              );
            })}
            </div>
          }
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export {Modal};