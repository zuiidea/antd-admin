const Mock = require('mockjs')
const mockUser = require("../../mock/users")
const mockData = [require("../../mock/users")]

function serialize(str) {
  let paramArray = str.split("&")
  let query = {}
  for (let i in paramArray) {
    query[paramArray[i].split("=")[0]] = paramArray[i].split("=")[1]
  }
  return query
}

for (let i in mockData) {
  for (let key in mockData[i]) {
    Mock.mock(eval("/"+key.split(" ")[1].replace(/\//g,"\\\/")+"/"), key.split(" ")[0].toLowerCase(), function (options) {
      options.query = !!options.url.split("?")[1] ? serialize(options.url.split("?")[1]) : (!!options.body ? serialize(options.body) : {})
      let res = {}
      let result = {}
      res.json = function (data) {
        result = data
      }
      mockUser[key](options, res)
      return result
    })
  }
}

Mock.setup({timeout: 400})
