/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { router } from 'utils'
import { parse, stringify } from 'qs'
import config from 'config'
import { RoleType } from 'utils/constant'
import { queryMenuList, logoutUser, queryUserInfo } from 'api'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys:
      JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { success, user } = yield call(queryUserInfo, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (success && user) {
        const { list } = yield call(queryMenuList)
        const { permissions } = user
        let menu = list
        if (
          permissions.role === RoleType.ADMIN ||
          permissions.role === RoleType.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id)
        } else {
          menu = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        })
        if (location.pathname === '/login') {
          router.push({
            pathname: '/dashboard',
          })
        }
      } else if (
        config.openPages &&
        config.openPages.indexOf(locationPathname) < 0
      ) {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *logout({ payload }, { call, put }) {
      const data = yield call(logoutUser, parse(payload))
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [
              {
                id: 1,
                icon: 'laptop',
                name: 'Dashboard',
                router: '/dashboard',
              },
            ],
          },
        })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *changeNavbar(action, { put, select }) {
      const { app } = yield select(_ => _)
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      state.siderFold = !state.siderFold
    },

    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      state.darkTheme = !state.darkTheme
    },

    switchMenuPopver(state) {
      state.menuPopoverVisible = !state.menuPopoverVisible
    },

    handleNavbar(state, { payload }) {
      state.isNavbar = payload
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
