import {color} from '../src/utils/theme'
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('Dashboard', Mock.mock({
  'sales|8': [
    {
      'name|+1': 2008,
      '内容数|200-500': 1,
      '屏幕数|180-400': 1,
      '客户数|300-550': 1
    }
  ],
  'cpu': {
    'usage|50-600': 1,
    space: 825,
    'cpu|40-90': 1,
    'data|20': [
      {
        'cpu|20-80': 1
      }
    ]
  },
  'browser': [
    {
      name: 'Google Chrome',
      percent: 43.3,
      status: 1
    },
    {
      name: 'Mozilla Firefox',
      percent: 33.4,
      status: 2
    },
    {
      name: 'Apple Safari',
      percent: 34.6,
      status: 3
    },
    {
      name: 'Internet Explorer',
      percent: 12.3,
      status: 4
    },
    {
      name: 'Opera Mini',
      percent: 3.3,
      status: 1
    },
    {
      name: 'Chromium',
      percent: 2.53,
      status: 1
    }
  ],
  orders: {
    data01: [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}],
    data02: [{name: 'A1', value: 100},
                    {name: 'A2', value: 300},
                   {name: 'B1', value: 100},
                   {name: 'B2', value: 80},
                   {name: 'B3', value: 40},
                   {name: 'B4', value: 30},
                   {name: 'B5', value: 50},
                  {name: 'C1', value: 100},
                  {name: 'C2', value: 200},
                   {name: 'D1', value: 150},
                   {name: 'D2', value: 50}]
  },
  user: {
    name: '中广闪动',
    email: 'dopool@dopool.com',
    sales: 3241,
    sold: 3556,
    avatar: 'http://dopool-web.dopool.com/appkweb/iTFG8NfeCJR9/basic_model_02_notitle/img/logo1.png'
  },
  'completed|12': [
    {
      'name|+1': 2008,
      'Task complete|200-1000': 1,
      'Cards Complete|200-1000': 1
    }
  ],
  'comments|5': [
    {
      name: '@last',
      'status|1-3': 1,
      content: '@sentence',
      avatar: function () {
        return Mock.Random.image('48x48', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      },
      date: function () {
        return '2016-' + Mock.Random.date('MM-dd') + ' ' + Mock.Random.time('HH:mm:ss')
      }
    }
  ],
  'recentSales|36': [
    {
      'id|+1': 1,
      name: '@last',
      'status|1-4': 1,
      date: function () {
        return Mock.Random.integer(2015, 2016) + '-' + Mock.Random.date('MM-dd') + ' ' + Mock.Random.time('HH:mm:ss')
      },
      'price|10-200.1-2': 1
    }
  ],
  quote: {
    name: '管理员',
    title: '中广闪动（北京）科技有限公司',
    content: `北京闪动科技有限公司为新华社CNC、中经电视、光明电视、中投视讯、天地电视等30多个国家主流媒体机构提供流媒体直播等增值服务的移动互联网传输通道。以国内领先的流媒体直播技术为基础，以展示当代中国、传播中国文化为理念，为全球观众提供清晰、流畅的音视频直播服务。
北京闪动科技有限公司是一家富有朝气、发展迅猛的互联网企业。作为手机流媒体领域的领先企业，公司致力于新一代流媒体传输技术和互联网流媒体技术的开发、推广和应用，全力推动中国数字媒体产业成为创意经济时代的主流产业。
公司拥有强大的技术研发实力，专注于自主知识产权的流媒体技术开发，包括适配iPhone、Android、Symbian、 WindowsMobile等多种手机操作系统的统一流媒体直播、点播平台，涵盖了视频编码、内容管理、用户管理、服务器监控、用户观看质量监控、广告发布、业务计费等系统，还能够为企业用户提供全面的多媒体解决方案和应用软件产品，并提供相应的信息咨询及技术支持服务。.`,
    avatar: 'http://dopool-web.dopool.com/appkweb/iTFG8NfeCJR9/basic_model_02_notitle/img/logo1.png'
  },
  numbers: [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: '屏幕总数',
      number: 2781
    }, {
      icon: 'desktop',
      color: color.red,
      title: '新增屏幕',
      number: 50
    }, {
      icon: 'team',
      color: color.blue,
      title: '互动人数',
      number: 3241
    }, {
      icon: 'appstore-o',
      color: color.purple,
      title: '在线内容总数',
      number: 253
    }
  ]
}))

module.exports = {
  'GET /api/dashboard' (req, res) {
    res.json(global[dataKey])
  }
}
