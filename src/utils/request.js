import axios from 'axios'
import qs from 'qs'

export default function request (options) {
  if (options.url.indexOf('//') > -1 && window.location.origin !== `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`) {
    options.url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${qs.stringify(options.data)}'&format=json`
    delete options.data
  }
  return axios(options).then((result) => {
    return result.data
  })
}
