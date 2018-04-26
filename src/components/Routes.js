import React from 'react'
import {Switch, Router, Route, IndexRoute} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App'

const browserHistory = createBrowserHistory()

const Routes = () => (
  <Router history={browserHistory}>
    <Route exact path='/' component={App} />
  </Router>
)

export default Routes
