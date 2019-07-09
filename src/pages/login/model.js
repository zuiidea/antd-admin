import { router, pathMatchRegexp } from 'utils'
import api from 'api'
import store from 'store'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '仪表盘',
        router: '/dashboard',
      },
    ],
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const response = yield call(loginUser, payload)
      //const { locationQuery } = yield select(_ => _.app);
      if (response.success) {
        //const { from } = locationQuery
        //yield put({ type: 'app/query' })
        store.set('routeList', response.data.menuInfoList)
        window.localStorage.setItem('loginInfo', JSON.stringify(response.data))
        //if (!pathMatchRegexp('/login', from)) {
        //  if (['', '/'].includes(from)) router.push('/dashboard')
        //  else router.push(from)
        //} else {
        router.push('/dict')
        //}
      } else {
        throw response
      }
    },
  },
}
