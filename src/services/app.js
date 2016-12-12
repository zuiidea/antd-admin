import { request } from '../utils'
import qs from 'qs'

export async function login(params) {
  return request('/api/login', {
    method: 'post',
    data:params,
  })
}

export async function logout(params) {
  return request('/api/logout', {
    method: 'post',
    data:params,
  })
}

export async function userInfo(params) {
  return request('/api/userInfo', {
    method: 'get',
    data:params,
  })
}

// export async function myCity() {
//   return request('http://www.zuimeitianqi.com/zuimei/myCity', {
//     method: 'get',
//     data:{flg:0},
//   })
// }
