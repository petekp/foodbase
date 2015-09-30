import React from 'react';
import { Router, Route, Link } from 'react-router';
import { Foodbase, NavPrimary } from './App';
import { Login } from './Login';
import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

const routes = {
  <Route path="/" handler={Foodbase}/>
  <Route path="login" handler={Login}/>
}

React.render(
    <Router routes={routes} />, document.getElementById('root')
);
