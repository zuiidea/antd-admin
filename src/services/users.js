import { request, config } from 'utils'

const { api } = config
const { users } = api

export async function query (params) {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
