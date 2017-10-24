import { request, config } from 'utils'

const { api } = config
const { dashboard } = api

export async function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}
