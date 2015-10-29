import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'

import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routeConfig from './routes.jsx'

require('./css/main.css')

function main() {
    const app = document.createElement('div')
    document.body.appendChild(app)
    render(<Router history={createBrowserHistory()} routes={routeConfig} />, app)
}

main()
