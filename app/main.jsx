import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/App'
import Index from './components/Index/Index'
import Admin from './components/Admin/Admin'
import NotFound404 from './components/NotFound404/NotFound404'

require('./css/main.css');

const app = document.createElement('div')
document.body.appendChild(app)

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="admin" component={Admin} />
      <Route path="^" component={NotFound404} />
    </Route>
  </Router>
), app)
