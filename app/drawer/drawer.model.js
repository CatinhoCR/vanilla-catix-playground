import Event from '../helpers/events'

class DrawerModel {
  constructor() {
    this.submenuEvent = new Event()
    this.apiUrl = './../mock-data/'
  }

  init() {

  }

  async loadNavItems() {
    const data = await fetch(`${this.apiUrl}nav.json`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(result => result)
      .catch(error => {
        console.log(error) // eslint-disable-line
      })
    return data
  }

  /*
  async GetDrawerNav() {
    const MenuItems = await fetch(`${this.apiUrl}nav.json`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(result => result)
      .catch(error => {
        console.log(error) // eslint-disable-line
      })
    return MenuItems
  }

  async GetSubmenuItem(submenu) {
    const SubMenuItems = await fetch(`${this.apiUrl}submenu`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(result => result)
      .catch(error => {
        console.log(error) // eslint-disable-line
      })
    return SubMenuItems
  }
  */

  // TODO: Get data as user clicks for light loading in stuff
  // async GetSelectionData() {}
}

export { DrawerModel }
