import React from 'react';
import {cx, css} from '@emotion/css';
import {Link} from 'react-router-dom';

import {useAlgorand} from '../../Packages/Algorand';

import {Context as NavigationContext} from './Navigation';
import {Button} from '../Button.jsx';
import {Icon} from '../Icons';

import {colors, breakpoints} from '../../utilities';

const styles = {
  head: css({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '32px',
    borderBottom: `1px solid ${colors.material.grey[300]}`,
    backgroundColor: colors.material.grey[100],
    [breakpoints.mobile]: {
      padding: '16px 16px',
    }
  }),
  navigationToggle: css({
    display: 'none',
    [breakpoints.mobile]: {
      display: 'block',
    }
  }),
  brand: css({
    flex: '1',
    display: 'flex',
    margin: '0 0 0 0',
    fontSize: '20px',
    fontWeight: '600',
    alignItems: 'center',
    alignContent: 'center',
    lineHeight: '1',
    [breakpoints.mobile]: {
      marginLeft: '8px',
    }
  }),
  logo: css({
    height: 40
  }),
  algoLogo: css({
    height: 30
  }),
  spacer: css({
    margin: 8
  })
};

// TODO: Find a place to put this.
/*
{algorand.state.account &&
  <div className="tags has-addons">
    <span className="tag is-dark">Account</span>
    <span className="tag" style={{justifyContent: 'flex-start', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{algorand.state.account}</span>
  </div>
}
*/

function Head(props) {
  const navigation = React.useContext(NavigationContext);
  const algorand = useAlgorand();

  const onToggleAuthentication = () => {
    if (algorand.state.account) {
      algorand.disconnect();
    } else {
      algorand.connect();
    }
  };

  return (
    <div className={cx(styles.head)}>
      <div className={cx(styles.navigationToggle)}>
        <Button isFlat onClick={navigation.toggle}>
          <Icon
            name={navigation.isVisible ? "Close" : "Menu"}
            size={24}
            color={colors.material.grey[600]}
          />
        </Button>
      </div>
      <div className={cx(styles.brand)}>
        <Link to="/">
          <img
            src="https://drive.google.com/uc?export=view&id=1gi_Ni_r1xQqrLRVlVVfXVvEEj-THLrq1"
            className={styles.logo}
          />
        </Link>
        <span className={styles.spacer}>-&gt;</span>
        <img
          src="https://www.algorand.com/assets/media-kit/logos/full/png/algorand_full_logo_black.png"
          className={styles.algoLogo}
        />
      </div>
      <Button onClick={onToggleAuthentication}>
        {algorand.state.account ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
}

export {Head};