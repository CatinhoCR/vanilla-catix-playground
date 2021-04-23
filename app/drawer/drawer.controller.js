import { DrawerModel } from './drawer.model'
import { DrawerView } from './drawer.view'

class Drawer {
  constructor(el) {
    this.container = el
    this.model = new DrawerModel()
    this.view = new DrawerView()
    this.init()
  }

  /**
   * Initialize the Controller's Event Listeners on Model/View
   * Loads Model data (dummy)
   * Execute setupView()
   */
  async init() {

    this.handleEventHandlers()
    await this.model.loadNavItems().then(
      res => {
        if (res) {
          this.setupView(res)
        }
      }
    )
  }

  setupView(data) {
    this.view.render(this.container).then(
      () => {
        this.view.afterRender(data)
      }
    )
  }

  /*
  async setupView() {
    // this.view.init(this.container)
    await this.view.render(this.menuData)
    // await this.view.render(this.container, this.menuData)
    // this.subMenuData = await this.model.GetSubmenuItem(this.menuData)

    // TODO: Get events from view and run the click functions when needed
    // TODO: Event will trigger function from model to fetch the data
    // this.view.togglerClick()
    this.afterSetup()
  }
  */

  async afterSetup() {
    // this.view.subMenuClick()
    // this.view.thirdMenuClick()
  }

  handleEventHandlers() {
    this.view.menuPopulated.addListener(() => {
      this.view.handleHamburgerClick()
      this.view.handleSubmenuClick()
    })
    // toggleDrawer()
    // this.view.playEvent.addListener(index => {
    //   if (isNaN(index) || index < 0 || index > 8) {
    //     return
    //   }
    //   this.model.play(index)
    // })
    // this.view.rematchEvent.addListener(() => {
    //   this.model.restartGame()
    // })

    // this.model.updateSquareEvent.addListener(data => {
    //   this.view.updateSquare(data)
    // })
  }
}

const drawer = {
  init() {
    const wrapperEl = document.querySelector('#drawer-navigation')
    if (wrapperEl) {
      const sidebar = new Drawer(wrapperEl) // eslint-disable-line no-unused-vars
    }
  },
}

export default drawer
