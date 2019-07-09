export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  //logoutUser: '/user/logout',
  logoutUser: '/system/login/loginOut',
  //loginUser: 'POST /user/login',
  loginUser: 'POST /system/login/ajaxLogin',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  queryDictTypeList: '/system/dict/getListByPage',
}
