module.exports = [
  {
    key: 'dashboard',
    name: '概要',
    icon: 'laptop'
  },
  {
    key: 'users',
    name: '用户管理',
    icon: 'user'
  },
  {
    key: 'ui',
    name: 'UI组件',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'ico',
        name: 'Ico 图标'
      },
      {
        key: 'search',
        name: 'Search 搜索'
      }
    ]
  },
  {
    key: 'analysis',
    name: '数据分析',
    icon: 'bar-chart',
    child: [
      {
        key: 'ad_analysis',
        name: '广告数据分析'
      },
      {
        key: 'dev_analysis',
        name: '设备数据分析',
        child: [
          {
            key: 'dev_list',
            name: '设备列表'
          },
          {
            key: 'dev_details',
            name: '设备详情'
          }
        ]
      }
    ]
  }
]
