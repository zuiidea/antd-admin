import { pathMatchRegexp } from 'utils'
import api from 'api'

const { queryUser } = api

export default {
  namespace: 'userDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/user/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      const { success, message, status, ...other } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
