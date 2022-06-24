import React from 'react';
import {useLocation} from 'react-router-dom';
import {cx, css} from '@emotion/css';
import {Link} from 'react-router-dom';

import {Context} from './Context.jsx';

import {Icon} from '../../Icons';

import {colors, breakpoints, rootPage} from '../../../utilities';

const styles = {
  navigation: css({
    flex: '0 0 240px',
    display: 'grid',
    gridTemplateColumns: 'repeat(15, 16px)',
    gridAutoRows: 'max-content',
    padding: '32px 0',
    borderRight: `1px solid ${colors.material.grey[300]}`,
    [breakpoints.mobile]: {
      flex: '1',
      display: 'none',
    },
  }),
  isVisible: css({
    [breakpoints.mobile]: {
      display: 'grid',
    }
  }),
  item: css({
    gridColumnStart: '2',
    gridColumnEnd: '16',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 32px 0 0',
    lineHeight: '30px',
    [breakpoints.mobile]: {
      lineHeight: '36px',
    }
  }),
  link: css({
    color: colors.material.grey[600],
    '&:hover': {
      color: colors.bulma.link,
    }
  }),
  activeLink: css({
    color: colors.material.grey[900],
    fontWeight: '500',
  }),
};

function Item(props) {
  const location = useLocation();
  const isActive = location.pathname === props.page.pathname;

  return (
    <>
      <div
        key={props.page.path}
        className={cx(styles.item)}
        style={{
          gridColumnStart: `${2 + props.level + 1}`,
        }}
      >
        {props.level > 0 &&
          <Icon
            name="DirectoryItem"
            color={colors.material.grey[400]}
            size={16}
            style={{
              marginTop: '2px',
            }}
          />
        }
        <Link
          className={cx({
            [styles.link]: true,
            [styles.activeLink]: isActive
          })}
          to={props.page.pathname}
        >
          {props.page.title}
        </Link>
      </div>
      {props.page.children && props.page.children.map((page) => {
        return (
          <Item
            key={page.path}
            page={page}
            level={props.level + 1}
          />
        );
      })}
    </>
  );
}

function Navigation(props) {
  const context = React.useContext(Context);

  return (
    <nav
      className={cx({
        [styles.navigation]: true,
        [styles.isVisible]: context.isVisible
      })}
    >
      {rootPage.children.map((page) => {
        return (
          <Item key={page.path} page={page} level={0} />
        );
      })}
    </nav>
  );
}

export {Navigation};