// TODO: Seems like all these could be just 1 method
import {
  createListItem,
  createButton,
  createAnchor,
  // createIcon,
  createSpan,
  createDiv,
} from '../helpers/create-elements'

import Event from '../helpers/events'
import buttonHtml from './drawer-toggler.html'
import drawerHtml from './drawer-nav.html'

// Icons @todo move to a single container file that exports all, and then can import only whats needed everywhere
import homeIcon from '../../assets/img/icons/home.html'
import planetIcon from '../../assets/img/icons/planet.html'
import rocketIcon from  '../../assets/img/icons/rocket.html'
import settingsIcon from '../../assets/img/icons/settings.html'
import personIcon from '../../assets/img/icons/person-circle.html'

class DrawerView {
  constructor() {
    this.menuPopulated = new Event()
    // this.clickToggler = new Event()
    // this.clickItem = new Event()
    this.drawerHTML = drawerHtml
    this.togglerHTML = buttonHtml
    this.isExpanded = false
    this.menuPosition = 0
    this.isSubmenuActive = false

    this.icons = [
      {
        'name': 'home',
        'icon': homeIcon,
      },
      {
        'name': 'planet',
        'icon': planetIcon,
      },
      {
        'name': 'rocket',
        'icon': rocketIcon,
      },
      {
        'name': 'settings',
        'icon': settingsIcon,
      },
      {
        'name': 'person',
        'icon': personIcon,
      },
    ]
  }

  // @todo rename classes and do this more efficiently
  setSelectorControls() {
  // Selecting Default Shown DOM Elements
    this.drawer = document.querySelector('#drawer-nav')
    this.toggler = document.querySelector('#drawer-toggler')
    this.icon = document.querySelector('.hamburger-icon')
    this.navTop = this.drawer.querySelector('#drawer-nav-top')
    this.navBottom = this.drawer.querySelector('#drawer-nav-bottom')
    // Setting CSS Classes to be reused
    this.parentBtnClasses = ['drawer__button', 'button', 'button--transparent']
    // TODO: submenu-toggler conditionally
    // @todo rename classes
    this.subBtnClasses = ['drawer__sub-button', 'submenu-toggler', 'button', 'button--transparent']
    // TODO:
    // this.openedSubmenu = document.querySelector('.drawer-nav__flyout--open')
    // this.openDetailsCss = 'drawer-nav__flyout--sub-active'
    // this.detailsNav = document.querySelector('.drawer__third-level')
  }

  async render(container) {
    if (!container || !this.drawerHTML || !this.togglerHTML) {
      return false
    }
    container.innerHTML = this.drawerHTML + this.togglerHTML
    this.setSelectorControls()
    return true
  }

  afterRender(data) {
    if (data) {
      this.populateMenus(data).then(
        this.menuPopulated.trigger()
        // this.toggleDrawer()
        // @todo rethink how and when to populate sub menus and init clicks
      )
    }
  }

  initHamburgerClicks() {
    this.toggler.addEventListener('click', () => {
      // If submenu is active, go back
      if (this.isSubmenuActive) {
        this.hamburgerBackClick()
      } else {
        this.hamburgerToggleClick()
      }
      // if drawer has expanded (submenu open) class, go back.
      // If drawer has open class, then close it.. otherwise open
    })
  }

  initSubmenuClicks() {
    this.menuItems = [].slice.call(
      document.querySelectorAll('.drawer__button')
    )

    this.menuItems.forEach(item => {
      item.addEvxentListener('click', () => {
        this.submenuItemClick(item)
      })
    })
  }

  hamburgerToggleClick() {
    if (this.drawer.classList.contains('drawer__nav--active')) {
      this.hamburgerBackClick()
    } else {
      this.icon.classList.toggle('hamburger-icon--open')
      this.drawer.classList.toggle('drawer__nav--open')
    }
    // if (!this.drawer.classList.contains('drawer__nav--open')) {
    //   this.icon.classList.add('hamburger-icon--open')
    //   this.drawer.classList.add('drawer__nav--open')
    // }

  }

  hamburgerBackClick() {
    this.menuItems.forEach(button => {
      button.classList.remove('drawer__button--active')
    })
    this.icon.classList.remove('hamburger-icon--arrow-left')
    console.log('back') // eslint-disable-line
  }

  submenuItemClick(item) {
    const SubMenu = item.nextElementSibling
    if (!SubMenu) {
      this.navigateToRoute()
    }
    else if(SubMenu && SubMenu.classList.contains('drawer__submenu--active')) {
      SubMenu.classList.remove('drawer__submenu--active')
      this.icon.classList.remove('hamburger-icon--arrow-left')
    }
    else {
      this.icon.classList.add('hamburger-icon--arrow-left')
      SubMenu.classList.add('drawer__submenu--active')
    }
    // this.menuItems.forEach(button => {
    //   button.classList.remove('drawer__button--active')
    // })
    // const SubMenu = item.nextElementSibling
    // if (SubMenu) {
    //   SubMenu.classList.toggle('drawer__submenu--open')
    // }
  }

  navigateToRoute() {
    // Close nav, reset all values
    console.log('nav')
  }

  // afterRender(data) {
  //   if (data) {
  //     this.initGame(data).then(
  //       this.initPlayClicks()
  //     )
  //   }
  // }

  // initPlayClicks() {
  //   this.board.forEach(square => {
  //     square.addEventListener('click', e => {
  //       const index = parseInt(e.target.dataset.index)
  //       this.playEvent.trigger(index)
  //     })
  //   })
  // }

  /**
   *
   * @param {*} item
   * @returns icon/img wrapper with icon/img inside
   */
  addItemIcon(item) {
    const wrapper = createDiv('drawer__icon-wrapper')

    this.icons.forEach(icon => {
      if (icon.name === item.icon) {
        let iconElem

        // @todo review wrapping strat
        if (item.isImage) {
          const imgWrapper = createDiv('drawer__img-wrapper')
          imgWrapper.innerHTML = icon.icon
          wrapper.appendChild(imgWrapper)
          iconElem = imgWrapper.firstElementChild
          iconElem.classList.add('drawer__image')
        } else {
          wrapper.innerHTML = icon.icon
          iconElem = wrapper.firstElementChild
          iconElem.classList.add('drawer__icon')
        }
      }
    })
    return wrapper
  }

  /**
   *
   * @param {*} items
   * @returns true after being populated with data from model
   */
  async populateMenus(items) {
    if (!items) {
      return false
    }
    items.forEach(item => {
      const listItem = createListItem('drawer__item')

      const wrapper = this.addItemIcon(item)
      const span = createSpan('drawer__text', item.title)

      let button
      if (item.hasSubmenu) {
        button = createButton(this.parentBtnClasses)

        // @todo rethink: shuld be done later so we can pull user data on submenus or whatever, just to make it faster
        const subMenu = this.populateSubMenus(item)
        listItem.appendChild(subMenu)
      } else {
        button = createAnchor(this.parentBtnClasses, item.url)
      }
      button.appendChild(wrapper)
      button.appendChild(span)
      listItem.prepend(button)

      if (item.type === 'top') {
        this.navTop.appendChild(listItem)
      } else {
        this.navBottom.appendChild(listItem)
      }
    })
    return true
  }

  /**
   *
   * @param {*} item
   * @returns submenu
   */
  populateSubMenus(item) {
    const flyout = document.createElement('ul')
    flyout.classList.add('drawer__submenu')
    item.submenu.forEach(sub => {
      const subItem = createListItem('drawer__subitem')
      if (sub.type !== 'toggler') {
        const link = createAnchor(this.subBtnClasses, sub.data)
        link.innerHTML = sub.title
        subItem.appendChild(link)
      } else {
        const btn = createButton(this.subBtnClasses)
        btn.innerHTML = sub.title
        subItem.appendChild(btn)
      }
      flyout.appendChild(subItem)
    })
    return flyout
  }

  /*
  async render(menu) {
    await this.populateMenus(menu)
    // container.innerHTML = this.drawerHTML + this.togglerHTML
    // await this.initSelectors()
    // await this.populateMainNav(menu)
    // console.log(menu) // eslint-disable-line
    // Generar las listas del data
  }
  */

  /*
  toggleDrawer() {
    this.toggler.addEventListener('click', () => {
      // @todo handle this and account for back button option
      // this.isExpanded = !this.isExpanded
      this.icon.classList.toggle('hamburger-icon--open')
      this.drawer.classList.toggle('drawer__nav--open')
    })
    // @todo call in a better place
    this.toggleSubmenu()
  }

  toggleSubmenu() {
    this.menuItems = [].slice.call(
      // @todo
      document.querySelectorAll('.drawer__button')
    )
    this.menuItems.forEach(item => {
      item.addEventListener('click', () => {
        // @todo move all deactivation handlers to a single func and call on navigation or when corresponding
        this.menuItems.forEach(button => {
          button.classList.remove('drawer__button--active')
        })
        item.classList.add('drawer__button--active')
        // @todo rethink
        const SubMenu = item.nextElementSibling
        if (SubMenu) {
          // this.toggleSubmenu(SubMenu)
          // this.submenuSelected = SubMenu
          SubMenu.classList.toggle('drawer__submenu--open')
        }
        // @todo
        // else {
        //   this.backSubMenu()
        // }
      })
    })
  }
  */

  // @todo rethink strat here

}

export { DrawerView }