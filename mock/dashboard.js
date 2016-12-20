const qs = require('qs')
const Mock = require('mockjs')
const Watch = require("watchjs")
import mockStorge from '../src/utils/mockStorge'
import {color} from '../src/utils/theme'

let dataKey = mockStorge('Dashboard', Mock.mock({
  'sales|12': [
    {
      'name|+1': 1,
      'Clothes|200-500': 1,
      'Food|180-700': 1,
      'Electronics|300-850': 1
    }
  ],
  'recentSales|36':[
    {
      'id|+1': 1,
      name: '@last',
      'status|1-5': 1,
      date:function(){
        return Mock.Random.integer(2015, 2016)+'-'+Mock.Random.date('MM-dd')+' '+Mock.Random.time('HH:mm:ss')
      },
      'price|10-200.1-2':1
    }
  ],
  quote: {
    name: 'Joho Doe',
    title: 'Graphic Designer',
    content: `I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.`,
    avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236'
  },
  numbers: [
    {
      icon: 'dot-chart',
      color: color.green,
      title: 'Online Review',
      number: 2781
    }, {
      icon: 'pay-circle-o',
      color: color.blue,
      title: 'New Customers',
      number: 3241
    }, {
      icon: 'message',
      color: color.purple,
      title: 'Active Projects',
      number: 253
    }, {
      icon: 'paper-clip',
      color: color.red,
      title: 'Referrals',
      number: 4324
    }
  ]
}))

module.exports = {
  'GET /api/dashboard' (req, res) {
    console.log(global[dataKey].recentSales);
    res.json(global[dataKey])
  }
}
