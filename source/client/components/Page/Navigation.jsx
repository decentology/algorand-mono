import React, {useContext} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {NavLink, useLocation} from 'react-router-dom';

import {Context as HeadContext} from '../Head';

const pages = [
  {location: '/', title: 'Home'},
  {location: '/playground', title: 'Playground', children: [
    {location: '/playground/counter', title: 'Counter'},
    {location: '/playground/fungible-token', title: 'Fungible Token'},
    {location: '/playground/account', title: 'Account'},
    {location: '/playground/transfers', title: 'Transfers'},
  ]},
  {location: '/documentation', title: 'Documentation'},
];

const styles = StyleSheet.create({
  Navigation: {
    display: 'flex',
    flexDirection: 'column',
  }
});

function Item(page, location) {
  const isParent = (
    page.location !== '/' &&
    location.pathname.startsWith(page.location)
  );
  const isActive = location.pathname === page.location;
  
  return (
    <li key={page.location}>
      <NavLink
        to={page.location}
        className={() => isActive ? 'is-active' : ''}
      >
        {page.title}
      </NavLink>
      {page.children && isParent &&
        <ul>
          {page.children.map((child) => Item(child, location))}
        </ul>
      }
    </li>
  );
}

function Navigation(props) {
  const location = useLocation();
  const head = useContext(HeadContext);

  if (head.isVisible) {
    return (
      <aside className="menu mb-5">
        <p className="menu-label">Navigation</p>
        <ul className="menu-list">
          {pages.map((page) => Item(page, location))}
        </ul>
      </aside>
    );
  } else {
    return null;
  }
}

export default Navigation;