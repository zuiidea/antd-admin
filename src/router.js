import React from 'react'
import {Router} from 'dva/router'
import App from './routes/app'
import Error from './routes/error'

export default function ({history, app}) {

  const routes = [
    {
      path: '/',
      component: App,
      // IndexRoute:{
      //   component: Error,
      // },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              app.model(require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            })
          }
        }, {
          path: 'users',
          name: 'users',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/ui/ico'))
            })
          }
        }, {
          path: 'ui/ico',
          name: 'ui/ico',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              app.model(require('./models/users'))
              cb(null, require('./routes/users'))
            })
          }
        }, {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes}/>
}
