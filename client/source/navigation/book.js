export const book = Object.freeze([
  {
    name: 'about',
    componentPath: 'About',
    path: '/about',
    exact: false,
  },
  {
    name: 'main',
    componentPath: 'Main',
    path: '/',
    exact: true,
  },
  {
    name: '*',
    componentPath: 'Main',
    path: '*',
    exact: false,
  },
]);
