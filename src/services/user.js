import { request, config } from 'utils'

const { api } = config
const { user } = api

export function query (params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
