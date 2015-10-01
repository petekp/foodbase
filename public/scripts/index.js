import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, Link } from 'react-router'
import { createHistory } from 'history'

import { Foodbase, NavPrimary } from './App'
import { Login } from './Login'

let history = createHistory({ queryKey: false })

const routes = [
  {
    path: '/',
    component: Foodbase
  }
]

ReactDOM.render(
    <Router routes={routes} history={history} />, document.getElementById('root')
)
