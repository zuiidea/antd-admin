import { request, config } from 'utils'

const { api } = config
const { posts } = api

export function query (params) {
  return request({
    url: posts,
    method: 'get',
    data: params,
  })
}
