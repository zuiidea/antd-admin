import { request } from '../utils'

export async function query (params) {
  return request('/api/devices', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('/api/devices', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('/api/devices', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request('/api/devices', {
    method: 'put',
    data: params
  })
}
