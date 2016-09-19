import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import './utils/index.js'

import App from './view/index'
import SignIn from './view/user/signIn'
import List from './view/data/list'
import Error from './components/Error'
import Hello from './components/Hello'
import './utils/lib.less'

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={List}/>
      <Route path="index">
        <Route path="list" tableName="list" component={List}/>
      </Route>
      <Route path="*" component={Error}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('view'))
