import type { IRoute } from 'umi'

const routes: IRoute[] = [
  {
    exact: false,
    path: '/',
    component: '@/layouts',
    routes: [{ exact: true, path: '/login', component: '@/pages/login' }],
  },
]

export default routes
