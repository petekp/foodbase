import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router';
import css from '../css/app.css'
import FastClick from 'fastclick'
import { Foodbase, NavPrimary } from './App'

export class Login extends Component{
  render() {
    return(
        <div>
            <NavPrimary />
        Welcome to login</div>
    )
  }
}
