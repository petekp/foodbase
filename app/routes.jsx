import App from './components/App'
import Index from './components/Index/Index'
import Admin from './components/Admin/Admin'
import NotFound404 from './components/NotFound404/NotFound404'

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Index },
    childRoutes: [
        { path: '/admin', component: Admin },
        { path: '*', component: NotFound404 }
    ]
  }
]

module.exports = routeConfig
