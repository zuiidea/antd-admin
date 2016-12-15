const qs = require('qs')
const Mock = require('mockjs')
const Watch = require("watchjs")
import mockStorge from '../src/utils/mockStorge'


let dataKey = mockStorge('Dashboard',Mock.mock({
  'sales|16': [
    {
      'name|+1': 2000,
      'Clothes|200-500': 1,
      'Food|180-700': 1,
      'Electronics|300-850': 1,
    }
  ],
  quote:{
    name: 'Joho Doe',
    title: 'Graphic Designer',
    content: `I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.`,
    avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236'
  },
}))

module.exports = {
  'GET /api/dashboard' (req, res) {
    console.log(global[dataKey])
    res.json(global[dataKey])
  },
}
