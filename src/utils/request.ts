import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

const transformURL = (url: string, data: any) => {
  if (!data) {
    return { url, data }
  }
  let cloneData = data
  let cloneUrl = url
  try {
    cloneData = JSON.parse(JSON.stringify(data))
  } catch (error) {}

  Object.entries(cloneData).forEach(([key]) => {
    const reg = new RegExp(`/:${key}`)
    if (reg.test(cloneUrl)) {
      cloneUrl = cloneUrl.replace(`/:${key}`, `/${cloneData[key]}`)
      delete cloneData[key]
    }
  })

  return { url: cloneUrl, data: cloneData }
}

export type RequestConfig = AxiosRequestConfig | string

const request = <T>(config: RequestConfig): AxiosPromise<T> => {
  let params = config
  if (typeof config === 'object') {
    const axiosConfig = config as AxiosRequestConfig
    const { data, url } = transformURL(
      axiosConfig.url as string,
      axiosConfig.data
    )
    params = {
      ...axiosConfig,
      data,
      url,
    }

    if (
      (!params.method || params.method.toLocaleUpperCase() === 'GET') &&
      !params.params
    ) {
      params.params = data
    }
  }

  return axios(params as AxiosRequestConfig)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => {
      const { response } = error
      let message
      let statusCode = 0

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        message = data.message || statusText
      } else {
        message = error.message
      }
      return Promise.reject({
        statusCode,
        message,
      })
    })
}

export default request
