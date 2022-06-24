import React from 'react';
import {cx, css} from '@emotion/css';

import {Context} from './Context.jsx';

import * as Cards from '../../Cards';

const constants = {
  transitionDuration: 500
};

const styles = {
  viewport: css({
    position: 'relative',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
  }),
  cards: css({
    left: '0%',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100%)',
    alignContent: 'normal',
    width: '100%',
    height: 'auto',
    transition: `left 500ms ease-in-out, height 500ms ease-in-out`,
  }),
};

function Deck(props) {
  const context = React.useContext(Context);
  const cardsRef = React.useRef();

  const onTransitionEnd = React.useCallback(
    (event) => {
      if (event.target === cardsRef.current) {
        context.completeTransition();
      }
    },
    [context]
  );

  React.useEffect(() => {
    window.addEventListener('transitionend', onTransitionEnd);
    return () => {
      window.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [onTransitionEnd]);

  const [cardHeights, setCardHeights] = React.useState([]);

  const calculateCardHeights = () => {
    const nextCardHeights = [];
    for (const card of cardsRef.current.childNodes) {
      nextCardHeights.push(
        card.scrollHeight
      );
    }
    setCardHeights(nextCardHeights);
  };

  React.useEffect(() => {
    calculateCardHeights();
  }, [context.state.cards]);

  const currentHeight = context.state.currentCard ? cardHeights[context.state.currentCard] : cardHeights[0];
  const heightTransitionDuration = Math.max(
    (window.innerHeight / constants.transitionDuration) *
    (currentHeight / window.innerHeight) *
    constants.transitionDuration,
    constants.transitionDuration
  );
  
  return (
    <div className={cx(styles.viewport)}>
      <div
        ref={cardsRef}
        className={cx({
          [styles.cards]: true
        })}
        style={{
          left: `-${context.state.currentCard * 100}%`,
          height: `${currentHeight}px`,
          transition: `left 500ms ease-in-out, height ${heightTransitionDuration}ms ease-in-out`,
        }}
      >
        {context.state.cards.length === 0 &&
          <Cards.Loader />
        }
        {context.state.cards.map((card, index) => {
          return React.createElement(
            card.component,
            {
              key: index,
              ...card.props,
              calculateCardHeights
            }
          );
        })}
      </div>
    </div>
  );
}

export {Deck};