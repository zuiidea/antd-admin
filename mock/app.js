const Cookie = require('js-cookie')
import mockStorge from '../src/utils/mockStorge'

const userPermission = {
  DEFAULT: ['dashboard', 'chart'],
  ADMIN: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
  DEVELOPER: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
}

let dataKey = mockStorge('AdminUsers', [
  {
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  },
  {
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  },
  {
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
])

module.exports = {
  'POST /api/login' (req, res) {
    const userItem = JSON.parse(req.body)
    const response = {
      success: false,
      message: '',
    }
    const currentUser = global[dataKey].filter((item) => {
      return item.username === userItem.username
    })
    if (currentUser.length) {
      if (currentUser[0].password === userItem.password) {
        const now = new Date()
        now.setDate(now.getDate() + 1)
        Cookie.set('user_session', now.getTime(), { path: '/' })
        Cookie.set('user_name', userItem.username, { path: '/' })
        response.message = '登录成功'
        response.success = true
        response.userPermissions = global[dataKey].filter(_ => _.username === userItem.username)[0].permissions
      } else {
        response.message = '密码不正确'
      }
    } else {
      response.message = '用户不存在'
    }
    res.json(response)
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      username: Cookie.get('user_name') || '',
      message: '',
    }

    if (response.success) {
      response.userPermissions = global[dataKey].filter(_ => _.username === Cookie.get('user_name'))[0].permissions
    }

    res.json(response)
  },

  'POST /api/logout' (req, res) {
    Cookie.remove('user_session', { path: '/' })
    Cookie.remove('user_name', { path: '/' })
    res.json({
      success: true,
      message: '退出成功',
    })
  },
}
