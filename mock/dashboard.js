const qs = require('qs')
const Mock = require('mockjs')
const Watch = require("watchjs")

let usersListData = {}
if (!global.usersListData) {
  const data = !!localStorage.getItem("antdUsersListData")
    ? JSON.parse(localStorage.getItem("antdUsersListData"))
    : Mock.mock({
      'data|100': [
        {
          'id|+1': 1,
          name: '@cname',
          nickName: '@last',
          phone: /^1[34578]\d{9}$/,
          'age|11-99': 1,
          address: '@county(true)',
          isMale: '@boolean',
          email: '@email',
          createTime: '@datetime',
          avatar: function(){
            return Mock.Random.image('100x100', Mock.Random.color(),"#757575",'png',this.nickName.substr(0,1))
          }
        }
      ],
      page: {
        total: 100,
        current: 1
      }
    })
  usersListData = data
  global.usersListData = usersListData
  if (!localStorage.getItem("antdUsersListData")) {
    localStorage.setItem("antdUsersListData", JSON.stringify(usersListData))
  }
} else {
  usersListData = global.usersListData
}

Watch.watch(usersListData, function () {
  localStorage.setItem("antdUsersListData", JSON.stringify(usersListData))
})

module.exports = {

}
