import { request } from '../utils'
import qs from 'qs'

export async function myCity() {
  return request('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get',
    cross:true,
    data:{flg:0},
  })
}
