module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop',
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user',
  },
  {
    key: 'request',
    name: 'Request',
    icon: 'api',
  },
  {
    key: 'UIElement',
    name: 'UI Element',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'iconfont',
        name: 'IconFont 字体图标',
      },
      {
        key: 'dataTable',
        name: 'DataTable 数据表格',
      },
      {
        key: 'dropOption',
        name: 'DropOption 下拉操作',
      },
      {
        key: 'search',
        name: 'Search 搜索',
      },
      {
        key: 'editor',
        name: 'Editor 编辑器',
      },
      {
        key: 'layer',
        name: 'layer 弹层【方法】',
      },
    ],
  },
  {
    key: 'chart',
    name: 'Recharts',
    icon: 'code-o',
    child: [
      {
        key: 'lineChart',
        name: 'LineChart',
      },
      {
        key: 'barChart',
        name: 'BarChart',
      },
      {
        key: 'areaChart',
        name: 'AreaChart',
      },
    ],
  },
  {
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1',
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1',
          },
          {
            key: 'navigation22',
            name: '三级导航2',
          },
        ],
      },
    ],
  },
]
