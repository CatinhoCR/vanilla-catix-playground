import footerHtml from './footer.html'

class FooterView {
  constructor() {
    this.footerHTML = footerHtml
  }

  render(container) {
    container.innerHTML = this.footerHTML
  }

  togglerClick() {
    // Some event trigger here to send to controller, which would fire something in app
    // Like a get, post, or whatever..
  }
}

export { FooterView }
