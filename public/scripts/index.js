import React from 'react';
import { Router, Route, Link } from 'react-router';
import { Foodbase, NavPrimary } from './App';
import { Login } from './Login';

const routes = [
  {
    path: '/',
    component: Foodbase
  }
]

React.render(
    <Router routes={routes} />, document.getElementById('root')
);
