import { request } from '../utils'
import qs from 'qs'

export async function myCity(params) {
  return request('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get',
    cross:true,
    data:params,
  })
}

export async function queryWeather(params) {
  return request('http://www.zuimeitianqi.com/zuimei/queryWeather', {
    method: 'get',
    cross:true,
    data:params,
  })
}
