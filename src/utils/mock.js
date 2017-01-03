const Mock = require('mockjs')
const mockData = [require('../../mock/users'), require('../../mock/app'), require('../../mock/dashboard')]

function serialize (str) {
  let paramArray = str.split('&')
  let query = {}
  for (let i in paramArray) {
    query[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1]
  }
  return query
}

for (let i in mockData) {
  for (let key in mockData[i]) {
    Mock.mock(eval('/' + key.split(' ')[1].replace(/\//g, '\\\/') + '/'), key.split(' ')[0].toLowerCase(), function (options) {
      if (key.split(' ')[0].toLowerCase() == 'get') {
        options.query = options.url.split('?')[1]
          ? serialize(options.url.split('?')[1])
          : (options.body
            ? serialize(options.body)
            : {})
      }
      let res = {}
      let result = {}
      res.json = function (data) {
        result = data
      }
      mockData[i][key](options, res)
      return result
    })
  }
}

Mock.setup({timeout: '200-600'})
