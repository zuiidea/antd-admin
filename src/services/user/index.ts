export type TUserAPIProperty =
  | 'queryUserInfo'
  | 'logoutUser'
  | 'loginUser'
  | 'queryUser'
  | 'queryUserList'
  | 'updateUser'
  | 'createUser'
  | 'removeUser'
  | 'removeUserList'

export type TUserAPI = Record<TUserAPIProperty, string>

export default {
  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',
  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',
} as TUserAPI

