import React from 'react'
import { Router, Route , IndexRedirect , hashHistory} from 'dva/router'
import App from './components/layout/main'
import Error from './routes/error'
import Dashboard from './routes/dashboard'
import Users from './routes/users'

export default function ({ history }) {
  return (
    <Router history={ history }>
      <Route path="/" component={ App } >
        <IndexRedirect to="/dashboard" />
        <Route path="dashboard" component={Dashboard}/>
        <Route path="/users" component={ Users } />
        <Route path="*" component={ Error } />
      </Route>
    </Router>
  )
}
