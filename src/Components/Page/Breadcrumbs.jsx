import {cx} from '@emotion/css';
import {Link, useLocation} from 'react-router-dom';

import {rootPage} from '../../utilities';

function Breadcrumbs(props) {
  const location = useLocation();
  const path = location.pathname.split('/');

  let pages = [rootPage];
  const breadcrumbs = [];
  for (let i = 0; i < path.length; i += 1) {
    const component = path[i];

    const page = pages.find((candidate) => candidate.path === component);

    if (page) {
      breadcrumbs.push(page);
      pages = page.children;
    }
  }

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {true && breadcrumbs.map((breadcrumb, index) => {
          const isActive = location.pathname === breadcrumb.pathname;

          return (
            <li
              key={index}
              className={cx({
                'is-active': isActive
              })}
            >
              <Link to={breadcrumb.pathname}>{breadcrumb.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export {Breadcrumbs};