const routes = [
  {
    exact: false,
    path: '/',
    // component: '@/layouts/index', // comment due to double layout
    routes: [
      { exact: true, path: '/login', component: '@/pages/login' },
      { exact: true, path: '/user', component: '@/pages/user' },
    ],
  },
]

export default routes
