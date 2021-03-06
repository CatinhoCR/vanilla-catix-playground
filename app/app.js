import RoutingModule from './router'
import Drawer from './drawer/drawer.controller'
import HeaderNavbar from './shared/header/header-navbar.ctrl'
import Footer from './shared/footer/footer.ctrl'

import '../assets/styles/app.scss'

if (process.env.NODE_ENV === 'development') {
  require('./index.html')
}

class App {
  constructor(el) {
    this.body = el
    this.init()
  }

  async init() {
    RoutingModule.init(this.body)
    HeaderNavbar.init()
    Drawer.init()
    Footer.init()
  }
}

const app = {
  init() {
    const wrapperEl = document.querySelector('#app')
    if (wrapperEl) {
      const app = new App(wrapperEl) // eslint-disable-line no-unused-vars
    }
  },
}

// load
window.addEventListener('load', () => app.init())
