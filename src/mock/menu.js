const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '7',
    bpid: '1',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/post',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  },
  {
    id: '3',
    bpid: '1',
    name: 'Request',
    icon: 'api',
    route: '/request',
  },
  {
    id: '4',
    bpid: '1',
    name: 'UI Element',
    icon: 'camera-o',
  },
  {
    id: '41',
    bpid: '4',
    mpid: '4',
    name: 'IconFont',
    icon: 'heart-o',
    route: '/UIElement/iconfont',
  },
  {
    id: '42',
    bpid: '4',
    mpid: '4',
    name: 'DataTable',
    icon: 'database',
    route: '/UIElement/dataTable',
  },
  {
    id: '43',
    bpid: '4',
    mpid: '4',
    name: 'DropOption',
    icon: 'bars',
    route: '/UIElement/dropOption',
  },
  {
    id: '44',
    bpid: '4',
    mpid: '4',
    name: 'Search',
    icon: 'search',
    route: '/UIElement/search',
  },
  {
    id: '45',
    bpid: '4',
    mpid: '4',
    name: 'Editor',
    icon: 'edit',
    route: '/UIElement/editor',
  },
  {
    id: '46',
    bpid: '4',
    mpid: '4',
    name: 'layer (Function)',
    icon: 'credit-card',
    route: '/UIElement/layer',
  },
  {
    id: '5',
    bpid: '1',
    name: 'Recharts',
    icon: 'code-o',
  },
  {
    id: '51',
    bpid: '5',
    mpid: '5',
    name: 'LineChart',
    icon: 'line-chart',
    route: '/chart/lineChart',
  },
  {
    id: '52',
    bpid: '5',
    mpid: '5',
    name: 'BarChart',
    icon: 'bar-chart',
    route: '/chart/barChart',
  },
  {
    id: '53',
    bpid: '5',
    mpid: '5',
    name: 'AreaChart',
    icon: 'area-chart',
    route: '/chart/areaChart',
  },
  {
    id: '6',
    bpid: '1',
    name: 'Test Navigation',
    icon: 'setting',
  },
  {
    id: '61',
    bpid: '6',
    mpid: '6',
    name: 'Test Navigation1',
    route: '/navigation/navigation1',
  },
  {
    id: '62',
    bpid: '6',
    mpid: '6',
    name: 'Test Navigation2',
    route: '/navigation/navigation2',
  },
  {
    id: '621',
    bpid: '62',
    mpid: '62',
    name: 'Test Navigation21',
    route: '/navigation/navigation2/navigation1',
  },
  {
    id: '622',
    bpid: '62',
    mpid: '62',
    name: 'Test Navigation22',
    route: '/navigation/navigation2/navigation2',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
