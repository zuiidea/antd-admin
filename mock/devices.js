const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('DevicesList', Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      name: '@cname',
      mac: /([0-9A-Fa-f]{2}-){5}[0-9A-Fa-f]{2}/,
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      status: function () {
        return Mock.Random.pick(['在线', '断网', '异常', '维护中'])
      },
      'index|+1': 1
    }
  ],
  page: {
    total: 100,
    current: 1
  }
}))

let devicesListData = global[dataKey]

module.exports = {

  'GET /api/devices' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = devicesListData.data.concat()

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = devicesListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      devicesListData.page.current = currentPage * 1
      newPage = devicesListData.page
    }
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/devices' (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))

    newData.id = devicesListData.data.length + 1
    devicesListData.data.unshift(newData)

    devicesListData.page.total = devicesListData.data.length
    devicesListData.page.current = 1

    global[dataKey] = devicesListData

    res.json({success: true, data: devicesListData.data, page: devicesListData.page})
  },

  'DELETE /api/devices' (req, res) {
    const deleteItem = req.body

    devicesListData.data = devicesListData.data.filter(function (item) {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    devicesListData.page.total = devicesListData.data.length

    global[dataKey] = devicesListData

    res.json({success: true, data: devicesListData.data, page: devicesListData.page})
  },

  'PUT /api/devices' (req, res) {
    const editItem = req.body

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.nickName.substr(0, 1))

    devicesListData.data = devicesListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = devicesListData
    res.json({success: true, data: devicesListData.data, page: devicesListData.page})
  }

}
