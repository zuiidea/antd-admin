const qs = require('qs')

const userPermission = {
  DEFAULT: ['dashboard', 'chart'],
  ADMIN: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
  DEVELOPER: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
]

module.exports = {
  'POST /api/login' (req, res) {
    console.log(req.body)
    const now = new Date()
    now.setDate(now.getDate() + 1)
    res.cookie('token', JSON.stringify({
      id: 2,
      deadline: now.getTime(),
    }), { maxAge: 900000, httpOnly: true })
    res.json({
      success: true,
      message: '登录成功',
    })
  },

  'GET /api/userInfo' (req, res) {
    const cookies = qs.parse(req.headers.cookie, { delimiter: ';' })
    const response = {}
    if (!cookies.token) {
      res.json({
        success: false,
      })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        response.userPermissions = userItem[0].permissions
      }
    }
    res.json(response)
  },

  'POST /api/logout' (req, res) {
    res.json({
      success: true,
      message: '退出成功',
    })
  },
}
