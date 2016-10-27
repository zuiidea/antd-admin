import { request } from '../utils'
import qs from 'qs'

export async function login(params) {
  console.log("48646");
  return request('/api/login', {
    method: 'post',
    data:params,
  })
}
