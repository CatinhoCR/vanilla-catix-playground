// import { FooterModel } from './footer.model'
import { FooterView } from './footer.view'

class Footer {
  constructor(el) {
    this.container = el
    // this.model = new FooterModel()
    this.view = new FooterView()

    this.initFooterComponent()
  }

  initFooterComponent() {
    this.setupView()
  }

  setupView() {
    this.view.render(this.container)
  }

  afterSetup() {
  }
}

const footer = {
  init() {
    const wrapperEl = document.querySelector('#site-footer')
    if (wrapperEl) {
      const sidebar = new Footer(wrapperEl) // eslint-disable-line no-unused-vars
    }
  },
}

export default footer
