import {cx, css} from '@emotion/css';

import {useAlgorand} from '../../Packages/Algorand/useAlgorand.js';

import {AlgorandSigner} from '../../Packages/AlgorandSigner';

import {Head} from './Head.jsx';
import {Body} from './Body.jsx';
import {Feet} from './Feet.jsx';

import {Provider as NavigationProvider} from './Navigation';
import {Modal, Provider as ModalProvider} from '../Modal';
import {Icons} from '../Icons';

import {colors} from '../../utilities/colors.js';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: colors.material.grey[300],
  }),
  scrollIsDisabled: css({
    overflow: 'hidden',
  }),
};

function Page(props) {
  const algorand = useAlgorand();

  return (
    <ModalProvider>
      <AlgorandSigner>
        <NavigationProvider>
          <div
            className={cx({
              [styles.container]: true,
              [styles.scrollIsDisabled]: algorand.hasPreparedTransactions
            })}
          >
            <Icons />
            <Modal />
            <Head />
            <Body />
          </div>
        </NavigationProvider>
      </AlgorandSigner>
    </ModalProvider>
  );
}

export {Page};