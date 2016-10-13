import React from 'react'
import { Router, Route } from 'dva/router'
import Index from './routes/index'
import NotFound from './routes/NotFound'
import Users from './routes/users'

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Index} />
      <Route path="/users" component={Users} />
      <Route path="*" component={NotFound} />
    </Router>
  )
}
