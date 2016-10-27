const qs = require('qs')
const Mock = require('mockjs')
const Watch = require("watchjs")

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
    console.log(req);
    console.log(res);
    console.log("858484");
    res.json({success: true})
  },
}
