import {login, userInfo} from '../services/app'
import {parse} from 'qs'
import Cookie from 'js-cookie'

console.log(Cookie.get('user_session'));

export default {
  namespace : 'app',
  state : {
    login: Cookie.get('user_session') > new Date().getTime()
      ? true
      : false,
    loading: false,
    loginButtonLoading: false
  },
  effects : {
    *login({
      payload
    }, {call, put}) {
      yield put({type: 'showButtonLoading'})
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
      return {login: true, loading: false, loginButtonLoading: false}
    },
    showLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    }
  }
}
