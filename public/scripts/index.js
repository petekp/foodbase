import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { createHistory } from 'history'
import { Foodbase, NavPrimary } from './App'
import { Login } from './Login'
import About from './About'


let history = createHistory({ queryKey: false })

const routes = [
  {
    path: '/',
    component: Foodbase,
    indexRoute: { component: Foodbase },
    childRoutes: [
      { path: 'about', component: About }
    ]
  }
]

ReactDOM.render(
    <Router routes={routes} history={history} />, document.getElementById('root')
)
