import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import classNames from 'classnames';

import {useAlgorand} from '../../packages/hyperverse';

import {Icon} from './Icons';
import * as AlgorandComponents from './Algorand';

import {colors} from '../../utilities';

const styles = StyleSheet.create({
  Footer: {
    width: '100%',
    backgroundColor: colors.grey[100],
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: '960px',
    margin: 'auto',
    padding: '1.5rem',
    '@media screen and (min-width: 1024px)': {
      padding: '3rem'
    }
  },
  item: {
    marginRight: '1.5rem',
    ':last-child': {
      marginRight: '0',
    }
  }
});

function Footer(props) {
  const algorand = useAlgorand();

  const onCallToAction = () => {
    if (algorand.isConnected) {
      algorand.disconnect();
    } else {
      algorand.connect();
    }
  };

  return (
    <footer className={css(styles.Footer)}>
      <div className={css(styles.container)}>
        {algorand.isConnected &&
          <div className={css(styles.item)} style={{flex: '1'}}>
            <AlgorandComponents.Address
              title="Account"
              address={algorand.state.account}
            />
          </div>
        }
        <div className={css(styles.item)}>
          <button
            className={classNames({
              'button': true,
              'is-primary': !algorand.isConnected,
              'is-rounded': true
            })}
            onClick={onCallToAction}
          >
            <Icon
              name="AccountBalanceWallet"
              size={18}
              color={algorand.isConnected ? '#363636' : 'white'}
            />
            <span style={{marginLeft: '8px'}}>
              {algorand.isConnected ? 'Disconnect' : 'Connect'}
            </span>
          </button>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;