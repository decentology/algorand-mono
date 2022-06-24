const pages = [{
  title: 'Home',
  path: '',
  children: [
    // {
    //   title: 'Ecosystem',
    //   path: 'ecosystem',
    //   children: []
    // },
    {
      title: 'Resources',
      path: 'resources',
      children: []
    },
    {
      title: 'TEAL',
      path: 'teal',
      children: [
        {title: 'Fundamentals', path: 'fundamentals', children: []},
        {title: 'Draft', path: 'draft', children: []},
      ]
    },
    {
      title: 'Author',
      path: 'author',
      children: [
        {title: 'Applications', path: 'applications', children: []},
        {title: 'Transaction', path: 'transaction', children: []}
      ]
    },
    {
      title: 'Hyperverse',
      path: 'hyperverse',
      children: []
    }
  ]
}];

function flattenPaths(pages, previousPath) {
  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];
    if (previousPath !== '/') {
      page.pathname = `${previousPath}/${page.path}`;
    } else {
      page.pathname = `${previousPath}${page.path}`;
    }
    if (page.children && page.children.length > 0) {
      flattenPaths(page.children, page.pathname);
    } 
  }
}

flattenPaths(pages, '');

const rootPage = pages[0];

export {pages, rootPage};