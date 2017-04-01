const userPermission = {
  DEFAULT: ['dashboard', 'chart'],
  ADMIN: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
  DEVELOPER: ['dashboard', 'users', 'UIElement', 'UIElementIconfont', 'chart'],
}

const adminUsers = [
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
]

module.exports = {
  'POST /api/login' (req, res) {
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    // console.log(req.baseUrl)
    // console.log(req.cookies)
    // console.log(req.hostname)
    // console.log(req.fresh)
    // const userItem = JSON.parse(req.body)
    // const response = {
    //   success: false,
    //   message: '',
    // }
    // const currentUser = AdminUsers.filter((item) => {
    //   return item.username === userItem.username
    // })
    // if (currentUser.length) {
    //   if (currentUser[0].password === userItem.password) {
    //     const now = new Date()
    //     now.setDate(now.getDate() + 1)
    //     // Cookie.set('user_session', now.getTime(), { path: '/' })
    //     // Cookie.set('user_name', userItem.username, { path: '/' })
    //     response.message = '登录成功'
    //     response.success = true
    //     response.userPermissions = AdminUsers.filter(_ => _.username === userItem.username)[0].permissions
    //   } else {
    //     response.message = '密码不正确'
    //   }
    // } else {
    //   response.message = '用户不存在'
    // }
    // res.json(req)
    // res.end({ success: true })
    const now = new Date()
    now.setDate(now.getDate() + 1)
    res.cookie('user_session', now.getTime(), { maxAge: 900000, httpOnly: true })
    res.json({
      success: true,
      message: '登录',
    })
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      // success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
      // username: Cookie.get('user_name') || '',
      message: '',
    }
    if (response.success) {
      // response.userPermissions = AdminUsers.filter(_ => _.username === Cookie.get('user_name'))[0].permissions
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
