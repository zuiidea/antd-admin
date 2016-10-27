import {login} from '../services/app'
import {parse} from 'qs'

export default {
  namespace : 'app',
  state : {
    login: false,
    loading: false,
    loginButtonLoading: false
  },
  effects : {
    *login({
      payload
    }, {call, put}) {
      yield put({ type: 'showButtonLoading' })
      const data = yield call(login, parse(payload))
      if (data) {
        yield put({type: 'loginSuccess', payload: {
            data
          }})
      }
    }
  },
  reducers : {
    loginSuccess(state) {
      return {
        login: true,
        loading: false,
        loginButtonLoading: false
      }
    },
    showLoading(state) {
      return { ...state, loginButtonLoading: true }
    }
  }
}
