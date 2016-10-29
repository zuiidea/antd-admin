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
    const now = new Date()
    now.setDate(now.getDate()+1)
    Cookie.set('user_session', now.getTime())
    res.json({success: true})
  },

  'GET /api/userInfo'  (req, res) {
    res.json({success: true})
  },
}
