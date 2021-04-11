import request from '@/utils/request'
import { AxiosPromise, AxiosRequestConfig } from 'axios'
import { config } from '@/configs'

const createService = <T, U = any>(params: string) => {
  let url = params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = paramsArray[1]
  }

  return (data: U) =>
    request<T>({
      url: config.apiPrefix + url,
      data,
      method: method as AxiosRequestConfig['method'],
    })
}

export type TService = <T>(data?: any) => AxiosPromise<T>

export default createService
