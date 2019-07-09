import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message, Modal } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { router } from 'utils'
import qs from 'qs'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    //message.error(e.message)
    Modal.error({
      title: e.message,
    })
  }

  options.url = url
  options.params = cloneData
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response

      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      })
    })
    .catch(error => {
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || '网络故障，请检查网络!'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}

//登录失效处理
const loginOvertimeProcess = msg => {
  const warning = Modal.warning({
    title: msg,
    okText: '返回登录页',
    okButtonProps: {
      onClick: () => {
        warning.destroy()
        router.push({
          pathname: '/login',
          search: qs.stringify({
            from: window.location.pathname,
          }),
        })
      },
    },
  })
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'))
    if (loginInfo && loginInfo.token) {
      config.headers.ml_token = loginInfo.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//添加响应拦截器
axios.interceptors.response.use(
  response => {
    const {
      config,
      data: { code, data, msg },
    } = response
    //4:刷新token
    if (code == '4' && data && data.token) {
      let loginInfoStr = window.localStorage.getItem('loginInfo')
      if (loginInfoStr) {
        let loginInfo = JSON.parse(loginInfoStr)
        loginInfo['token'] = data.token
        window.localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
      } else {
        loginOvertimeProcess(msg)
      }
      //重新上一次请求
      return axios(config)
    }
    //5:登录失效
    else if (code == '5') {
      loginOvertimeProcess(msg)
    }
    //7:未登录
    else if (code == '7') {
      router.push({
        pathname: '/login',
        search: qs.stringify({
          from: window.location.pathname,
        }),
      })
    }
    //1:操作失败,2:没有权限,3:无效token
    else if (code == '1' || code == '2' || code == '3') {
      Modal.warning({
        title: msg,
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
