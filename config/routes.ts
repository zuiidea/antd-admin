const routes = [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/login', component: '@/pages/login' },
      { exact: true, path: '/user', component: '@/pages/user' },
    ],
  },
]

export default routes
