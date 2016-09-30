import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from './App'
import Main from './Main'

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
    </Route>
  </Router>
)

export default Routes
