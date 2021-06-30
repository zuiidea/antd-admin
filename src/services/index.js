import request from '../utils/request'
import { apiPrefix } from '../utils/config'

import api from './api'

export const CONTENT_TYPE_JSON = 'application/json;charset=UTF-8'

const gen = (params) => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function (data) {
    return request({ url, data, method, contentType: CONTENT_TYPE_JSON })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
