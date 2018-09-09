import { request, config } from 'utils'

const { APIV1 } = config

export function query(params) {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${APIV1}/weather/now.json`,
    method: 'get',
    data: params,
  })
}
