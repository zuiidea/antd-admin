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
    key: 'devices',
    name: '设备管理',
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
        key: 'advertises',
        name: '内容数据分析'
      },
      {
        key: 'devices',
        name: '设备数据分析'
      }
    ]
  },
  {
    key: 'setting',
    name: '设置',
    icon: 'camera-o',
    clickable: false,
    child: [
      {
        key: 'account_info',
        name: '账号信息'
      },
      {
        key: 'account_status',
        name: '账号状态'
      },
      {
        key: 'account_setting',
        name: '账号设置'
      },
      {
        key: 'illegal_record',
        name: '违规记录'
      }
    ]
  },
]
