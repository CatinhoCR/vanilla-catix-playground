import Event from '../helpers/events'
import buttonHtml from './drawer-toggler.html'
import drawerHtml from './drawer-nav.html'

import {
  createListItem,
  createButton,
  createAnchor,
  // createIcon,
  createSpan,
  createDiv,
} from '../helpers/create-elements'

// Icons @todo move to a single container file that exports all, and then can import only whats needed everywhere
import homeIcon from '../../assets/img/icons/home.html'
import planetIcon from '../../assets/img/icons/planet.html'
import rocketIcon from  '../../assets/img/icons/rocket.html'
import settingsIcon from '../../assets/img/icons/settings.html'
import personIcon from '../../assets/img/icons/person-circle.html'

class DrawerView {
  constructor() {
    this.menuPopulated = new Event()
    this.drawerHTML = drawerHtml
    this.togglerHTML = buttonHtml
    this.isDocked = false
    this.menuPosition = 0
    this.isSubActive = false
  }

  // Move to another file to reuse
  mapComponentIcons() {
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

  init() {
    this.mapComponentIcons()
    this.drawer = document.querySelector('#drawer-nav')
    this.toggler = document.querySelector('#drawer-toggler')
    this.icon = document.querySelector('.hamburger-icon')
    this.navTop = this.drawer.querySelector('#drawer-nav-top')
    this.navBottom = this.drawer.querySelector('#drawer-nav-bottom')
    // Setting CSS Classes to be reused
    this.parentBtnClasses = ['drawer__button', 'button', 'button--transparent']
    // TODO: submenu-toggler conditionally
    // @todo rename classes
    this.subBtnClasses = [
      'drawer__sub-button',
      'submenu-toggler',
      'button',
      'button--transparent',
    ]
    // TODO:
    // this.openedSubmenu = document.querySelector('.drawer-nav__flyout--open')
    // this.openDetailsCss = 'drawer-nav__flyout--sub-active'
    // this.detailsNav = document.querySelector('.drawer__third-level')
    this.submenuItems = []
    this.submenuLinks = []
  }

  async render(container) {
    if (!container || !this.drawerHTML || !this.togglerHTML) {
      return false
    } else {
      container.innerHTML = this.drawerHTML + this.togglerHTML
      this.init()
      return true
    }
  }

  afterRender(data) {
    if (data) {
      this.populateMenus(data).then(
        this.menuPopulated.trigger()
      )
    }
  }

  handleHamburgerClick() {
    this.toggler.addEventListener('click', () => {
      if (this.isSubActive) {
        this.goBackSubmenu()
      } else {
        this.isDocked = !this.isDocked
        this.icon.classList.toggle('hamburger-icon--open')
        this.drawer.classList.toggle('drawer__nav--open')
      }
    })
  }

  // @todo lots of room for improvement
  handleSubmenuClick() {
    this.submenuItems.forEach((item, index) => {
      item.addEventListener('click', e => { // eslint-disable-line
        if (!this.isSubActive) {
          this.isSubActive = true
          this.menuPosition = index + 1
          item.nextElementSibling.classList.add('drawer__submenu--open')
          this.icon.classList.add('hamburger-icon--arrow-left')
          this.drawer.classList.add('drawer__nav--active')
        } else if(this.isSubActive && this.menuPosition != (index + 1)) {
          this.menuPosition = index + 1
          this.submenuItems.forEach(button => {
            button.nextElementSibling.classList.remove('drawer__submenu--open')
          })
          item.nextElementSibling.classList.add('drawer__submenu--open')
        } else {
          this.goBackSubmenu()
        }

        // if (this.isSubActive) {
        //   this.goBackSubmenu()
        // } else {
        //
        // }

        /*
        this.submenuItems.forEach(button => {
          button.nextElementSibling.classList.remove('drawer__submenu--open')
        })
        const SubMenu = item.nextElementSibling
        if (!this.isSubActive) {
          this.isSubActive = true
          this.menuPosition = index + 1
          SubMenu.classList.add('drawer__submenu--open')
          this.icon.classList.add('hamburger-icon--arrow-left')
          this.drawer.classList.add('drawer__nav--active')
        } else if (this.isSubActive && this.menuPosition !== index + 1) {
          this.isSubActive = true
          this.menuPosition = index + 1
          SubMenu.classList.add('drawer__submenu--open')
        } else {
          this.isSubActive = false
          this.menuPosition = 0
          SubMenu.classList.remove('drawer__submenu--open')
          this.icon.classList.remove('hamburger-icon--arrow-left')
          this.drawer.classList.remove('drawer__nav--active')
        }
        */
      })

    })
  }

  // @todo make all these reusable and call from other methods
  goBackSubmenu() {
    this.isSubActive = false
    this.menuPosition = 0
    this.submenuItems.forEach(button => {
      button.nextElementSibling.classList.remove('drawer__submenu--open')
    })
    this.icon.classList.remove('hamburger-icon--arrow-left')
    this.drawer.classList.remove('drawer__nav--active')
  }

  /**
   *
   * @param {*} items
   * @returns
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
        this.submenuItems.push(button)
        // @todo rethink: shuld be done later so we can pull user data on submenus or whatever, just to make it faster
        const subMenu = this.populateSubMenus(item)
        listItem.appendChild(subMenu)
      } else {
        button = createAnchor(this.parentBtnClasses, item.url)
        this.submenuLinks.push(button)
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
}

export { DrawerView }
