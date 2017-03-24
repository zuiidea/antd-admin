import axios from 'axios'
import qs from 'qs'
import config from './config'

const fetch = (options) => {
  const { method = 'get', data, url } = options
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data })
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'delete':
      return axios.deleted(url, data)
    case 'head':
      return axios.head(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request (options) {
  if (options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin && config.baseURL.indexOf(origin) < 0) {
      options.url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${qs.stringify(options.data)}'&format=json`
      delete options.data
    }
  }

  return fetch(options).then((result) => {
    return result.data
  })
}
