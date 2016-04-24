import App from './components/App'
import Home from './components/Home/Home'
import Admin from './components/Admin/Admin'
import NotFound404 from './components/NotFound404/NotFound404'

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
        { path: '/admin', component: Admin },
        { path: '*', component: NotFound404 }
    ]
  }
]

module.exports = routeConfig
