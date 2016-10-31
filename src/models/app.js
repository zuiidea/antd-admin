import {login, userInfo} from '../services/app'
import {parse} from 'qs'
import Cookie from 'js-cookie'

export default {
  namespace : 'app',
  state : {
    login: Cookie.get('user_session') > new Date().getTime()
      ? true
      : false,
    loading: false,
    user:{
      name:"吴彦祖",
    },
    loginButtonLoading: false
  },
  effects : {
    *login({
      payload
    }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(login, parse(payload))
      if (data) {
        yield put({type: 'loginSuccess', payload: {
            data
          }})
      }
    },
    *userInfo({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(login, parse(payload))
      if (data) {
        console.log(data);
      }
    }
  },
  reducers : {
    loginSuccess(state) {
      return {login: true, loading: false, loginButtonLoading: false}
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    }
  }
}
