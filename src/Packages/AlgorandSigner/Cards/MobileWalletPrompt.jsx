import React from 'react';
import {cx, css} from '@emotion/css';

import {useAlgorand} from '../../Algorand/useAlgorand.js';
import {useCards} from '../Components/Cards';

import {Card} from '../Components';

import {Signature} from './Signature.jsx';

import {colors} from '../../../utilities/colors.js';

const styles = {
  logo: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 32px 0',
    padding: '32px',
    backgroundColor: colors.pera.yellow,
    borderRadius: '4px',
  })
};

function PeraLogo(props) {
  const size = {
    width: 699,
    height: 300
  };
  const frame = {
    width: (size.width / size.height) * props.height,
    height: props.height
  };

  return (
    <svg
      width={frame.width}
      height={frame.height}
      viewBox="0 0 699 300"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fill: colors.pera.black,
        display: 'block',
      }}
    >
      <path d="M164.783 63.7108C170.07 85.6186 168.283 104.889 160.79 106.753C153.298 108.617 142.937 92.3688 137.65 70.461C132.362 48.5532 134.149 29.2823 141.642 27.4183C149.134 25.5543 159.495 41.803 164.783 63.7108Z" />
      <path d="M252.096 82.5463C240.386 70.1352 217.088 73.4991 200.059 90.0599C183.031 106.621 178.719 130.107 190.429 142.518C202.14 154.929 225.437 151.565 242.466 135.005C259.494 118.444 263.806 94.9574 252.096 82.5463Z" />
      <path d="M158.959 272.59C166.452 270.726 167.976 250.365 162.364 227.112C156.752 203.86 146.128 186.521 138.636 188.385C131.143 190.249 129.619 210.61 135.231 233.863C140.843 257.115 151.467 274.454 158.959 272.59Z" />
      <path d="M82.5801 93.9088C104.197 100.283 119.992 111.467 117.86 118.888C115.728 126.308 96.4759 127.156 74.8594 120.782C53.2428 114.407 37.4475 103.224 39.5795 95.803C41.7115 88.3823 60.9636 87.5342 82.5801 93.9088Z" />
      <path d="M222.881 177.704C245.824 184.47 262.695 195.971 260.563 203.391C258.431 210.812 238.103 211.343 215.16 204.577C192.217 197.811 175.346 186.311 177.478 178.89C179.61 171.469 199.937 170.938 222.881 177.704Z" />
      <path d="M106.904 162.134C101.543 156.577 83.9604 164.665 67.6315 180.198C51.3027 195.731 42.4111 212.828 47.7717 218.385C53.1322 223.941 70.715 215.854 87.0439 200.321C103.373 184.788 112.264 167.691 106.904 162.134Z" />
      <path d="M346.861 96.205V91.4527H327.273V218.182H346.861V184.035C346.861 180.339 346.861 177.347 346.505 173.299H346.861C353.984 184.916 366.093 191.076 380.339 191.076C404.379 191.076 425.391 172.947 425.391 139.328C425.391 106.414 404.379 88.6365 380.339 88.6365C366.627 88.6365 354.518 94.6209 346.861 106.414H346.505C346.861 102.541 346.861 99.7253 346.861 96.205ZM375.353 174.355C357.189 174.179 346.683 158.866 346.683 139.152C346.683 120.495 357.189 105.534 375.353 105.358C393.16 105.182 404.913 118.911 404.913 139.328C404.913 160.274 393.16 174.531 375.353 174.355Z" />
      <path d="M528.251 131.056C528.251 106.766 508.663 88.6365 481.952 88.6365C453.46 88.6365 433.694 107.822 433.694 139.856C433.694 170.658 453.104 191.076 481.952 191.076C505.636 191.076 523.265 177.347 527.361 158.514H505.992C502.608 168.018 493.349 174.355 481.952 174.355C467.35 174.355 456.665 163.97 454.35 146.721H528.251V131.056ZM481.952 105.358C496.376 105.358 506.348 115.214 508.485 129.471H454.529C457.022 115.742 467.172 105.358 481.952 105.358Z" />
      <path d="M542.651 188.26H562.239V133.696C562.239 115.038 572.568 105.358 588.594 105.358H599.101V88.6365H590.731C576.307 88.6365 567.404 98.1412 562.239 106.414H561.883V91.4527H542.651V188.26Z" />
      <path d="M690.672 171.363C688.001 171.363 686.755 169.778 686.755 166.61V124.015C686.755 103.598 676.782 88.6365 647.4 88.6365C618.909 88.6365 605.909 102.718 604.485 122.783H624.073C625.319 111.87 634.045 105.358 647.4 105.358C658.797 105.358 666.632 110.286 666.632 118.031C666.632 124.367 662.18 128.239 647.578 128.239H639.743C616.416 128.239 600.745 137.568 600.745 158.866C600.745 181.219 617.306 191.428 636.716 191.428C651.14 191.428 663.427 185.092 668.235 171.539C668.769 181.395 675.358 188.26 687.823 188.26H698.864V171.363H690.672ZM667.167 143.2C667.167 165.026 655.236 174.531 639.921 174.531C626.566 174.531 621.224 166.786 621.224 158.866C621.224 151.297 625.853 145.137 640.099 145.137H642.948C656.66 145.137 665.208 140.384 666.988 132.112H667.167V143.2Z" />
    </svg>
  );
}

function MobileWalletPrompt(props) {
  const algorand = useAlgorand();
  const transaction = algorand.state.preparedTransactions[0];
  const cards = useCards();

  const sign = React.useCallback(
    async () => {
      await algorand.sign(transaction);
      cards.navigateTo({
        component: Signature,
        props: {
          title: 'Transaction'
        }
      });
    },
    [algorand, cards, transaction]
  );

  React.useEffect(() => {
    if (transaction.state < 2) {
      sign();
    }
  }, [transaction.state, sign]);

  return (
    <Card>
      <div className={cx(styles.logo)}>
        <PeraLogo height={48} />
      </div>
      <div className="content">
        <p>
          A signature request for this transaction has been sent to your <strong>Pera Algo Wallet</strong> app.
        </p>
        <p>
          Please continue on your mobile device.
        </p>
      </div>
    </Card>
  );
}

export {MobileWalletPrompt};