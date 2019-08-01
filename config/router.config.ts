export default [
  {
    path: "/account",
    component: "../layouts/UserLayout",
    routes: [
      {
        name: "login",
        path: "/account/login",
        component: "./account/login"
      }
    ]
  },
  {
    path: '/exception',
    routes: [
      {
        path: '/exception/404',
        component: './Exception/404'
      },
      {
        path: '/exception/403',
        component: './Exception/403'
      }
    ]
  },
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    authority: ['admin', 'user'],
    routes: [
      {
        path: "/",
        name: "welcome",
        icon: "smile",
        component: "./Welcome",
      },
      {
        component: "./404"
      }
    ]
  },
  // {
  //   component: "./404"
  // }
]
// /exception/403