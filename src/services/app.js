import { request } from '../utils'

export async function login (params) {
  return request({
    url: '/api/login',
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: '/api/logout',
    method: 'post',
    data: params,
  })
}

export async function userInfo (params) {
  return request({
    url: '/api/userInfo',
    method: 'get',
    data: params,
  })
}
