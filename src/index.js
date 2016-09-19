import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute,IndexRedirect,Redirect,hashHistory} from 'react-router'
import './utils/index.js'

import App from './view/index'
import SignIn from './view/user/signIn'
import List from './view/data/list'
import Dashboard from './view/user/dashboard'
import Error from './view/common/error'
import './utils/lib.less'

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
       <IndexRedirect to="/dashboard" />
      <Route path="dashboard" tableName="dashboard" component={Dashboard}/>
      <Route path="index">
        <Route path="list" tableName="list" component={List}/>
      </Route>
      <Route path="error" tableName="error" component={Error}/>
      <Redirect from="*" to="error" />
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('view'))
