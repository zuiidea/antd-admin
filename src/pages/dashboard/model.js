import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const { pathToRegexp } = require("path-to-regexp")
import { model } from 'utils/model'

const { queryDashboard, queryWeather } = api
const avatar = '//cdn.antd-admin.zuiidea.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236.jpeg'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
      icon: '//cdn.antd-admin.zuiidea.com/sun.png',
    },
    sales: [],
    quote: {
      avatar,
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathToRegexp('/dashboard').exec(pathname) ||
          pathToRegexp('/').exec(pathname)
        ) {
          dispatch({ type: 'query' })
          dispatch({ type: 'queryWeather' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryDashboard, parse(payload))
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
    *queryWeather({ payload = {} }, { call, put }) {
      payload.location = 'shenzhen'
      const result = yield call(queryWeather, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
          icon: `//cdn.antd-admin.zuiidea.com/web/icons/3d_50/${data.now.code}.png`,
        }
        yield put({
          type: 'updateState',
          payload: {
            weather,
          },
        })
      }
    },
  },
})
