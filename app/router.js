import Router from './_config/routing'
import Dashboard from './dashboard/dashboard.ctrl'
import Projects from './projects/projects.ctrl'

class RoutingModule {
  constructor(container) {
    this.body = container
    this.viewContainer = document.querySelector('#page-content')
    this.router()
  }

  router() {
    const router = new Router({
      mode: 'hash',
      root: '/',
    })
    // @todo Login, Session Cookies, Auth Guards, Set Dynamic Token session
    // @todo Actual routes and get/set query params and resp
    router
      .add('dashboard', () => {
        Dashboard.init(this.viewContainer)
      })
      .add('projects', () => {
        Projects.init(this.viewContainer)
      })
      .add('', () => {
        // @todo Wildcard route handling and AUTH GUARDS
        console.log('webpack starterkit') // eslint-disable-line no-console
        this.viewContainer.innerHTML = ''
        const intro = 'Welcome, this is a pseudo base route or 404'
        const pageTitle = document.createElement('h1')
        pageTitle.classList.add('heading', 'heading--md')
        pageTitle.innerHTML = intro
        this.viewContainer.appendChild(pageTitle)
      })
  }
}

const routerModule = {
  init(el) {
    const app = new RoutingModule(el) // eslint-disable-line no-unused-vars
  },
}

export default routerModule
