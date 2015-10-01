import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { Foodbase, NavPrimary } from './App';
import { Login } from './Login';

const routes = [
  {
    path: '/',
    component: Foodbase
  }
]

ReactDOM.render(
    <Router routes={routes} />, document.getElementById('root')
);
