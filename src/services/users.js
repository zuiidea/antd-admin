import { request } from '../utils'

export async function query (params) {
  return request('/api/users', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('/api/users', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('/api/users', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request('/api/users', {
    method: 'put',
    data: params
  })
}
