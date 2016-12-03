import {login, userInfo, logout} from '../services/app'
import {parse} from 'qs'
import Cookie from 'js-cookie'

export default {
  namespace : 'app',
  state : {
    login: false,
    loading: false,
    user: {
      name: "吴彦祖"
    },
    loginButtonLoading: false,
    siderFold:false,
    darkTheme:true,
  },
  subscriptions : {
    setup({dispatch}) {
      dispatch({type: 'queryUser'})
    }
  },
  effects : {
    *login({
      payload
    }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(login, parse(payload))
      if (data.success) {
        yield put({type: 'loginSuccess', payload: {
            data
          }})
      } else {
        yield put({type: 'loginFail', payload: {
            data
          }})
      }
    },
    *queryUser({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(userInfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username
            }
          }
        })
      } else {
        yield put({type: 'hideLoading'})
      }
    },
    *logout({
      payload
    }, {call, put}) {
      const data = yield call(logout, parse(payload))
      if(data.success){
        yield put({
          type: 'logoutSuccess'
        })
      }
    },
    *switchSider({
      payload
    }, {put}) {
      console.log("switchSider");
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme({
      payload
    }, {put}) {
      console.log("changeTheme");
      yield put({
        type: 'handleChangeTheme'
      })
    },
  },
  reducers : {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess(state){
      return {
        ...state,
        login: false
      }
    },
    loginFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
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
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme(state) {
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
  }
}
