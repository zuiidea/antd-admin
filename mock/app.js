const qs = require('qs')
const Mock = require('mockjs')
const Watch = require("watchjs")
const Cookie = require("js-cookie")

let adminUsersData = {}
if (!global.adminUsersData) {
  const data = !!localStorage.getItem("antdAdminUsersData")
    ? JSON.parse(localStorage.getItem("antdAdminUsersData"))
    : [
      {
        username: 'guest',
        password: 'guest'
      }
    ]
  adminUsersData = data
  global.adminUsersData = adminUsersData
  if (!localStorage.getItem("antdAdminUsersData")) {
    localStorage.setItem("antdAdminUsersData", JSON.stringify(adminUsersData))
  }
} else {
  adminUsersData = global.adminUsersData
}

Watch.watch(adminUsersData, function () {
  localStorage.setItem("antdAdminUsersData", JSON.stringify(adminUsersData))
})


module.exports = {
  'POST /api/login'  (req, res) {
    const userItem = req.body
    const d = adminUsersData.filter(function (item) {
      return item.username==userItem.username
    })
    if(!!d.length){
      if(d[0].password==userItem.password){

      }else {

      }
    }else {

    }
    const now = new Date()
    now.setDate(now.getDate()+1)
    Cookie.set('user_session', now.getTime())
    Cookie.set('user_name', userItem.username)
    res.json({success: true})
  },

  'GET /api/userInfo'  (req, res) {
    res.json({success: true,username:"吴彦祖"})
  },
}
