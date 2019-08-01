export default [
  {
    path: '/account',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/account/login',
        component: './Account/login',
      },
    ],
  },
  {
    path: '/exception',
    routes: [
      {
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        path: '/exception/403',
        component: './Exception/403',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'dashboard',
        icon: 'home',
        component: './Home',
      },
      {
        name: 'user',
        path: '/user',
        icon: 'user',
        component: './user/list',
      },
    ],
  },
  {
    component: './Exception/404',
  },
];
