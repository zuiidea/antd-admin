import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zhName: '仪表盘',
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: 'Users',
    zhName: '用户管理',
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'User Detail',
    zhName: '用户详情',
    route: '/user/:id',
  },
  {
    id: '5',
    breadcrumbParentId: '1',
    name: 'ECharts',
    zhName: 'ECharts',
    icon: 'line-chart',
    route: '/chart/ECharts',
  }
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
