// TODO: Seems like all these could be just 1 method
import {
  createListItem,
  createButton,
  createAnchor,
  createIcon,
  createSpan,
  createDiv,
} from '../helpers/create-elements'
import Event from '../helpers/events'
import buttonHtml from './drawer-toggler.html'
import drawerHtml from './drawer-nav.html'

// Icons @todo move to a single container file that exports all, and then can import only whats needed everywhere
import homeIcon from '../../assets/img/icons/home-sharp.html'
import planetIcon from '../../assets/img/icons/planet-sharp.html'
import rocketIcon from  '../../assets/img/icons/rocket-sharp.html'
import settingsIcon from '../../assets/img/icons/settings-sharp.html'
import personIcon from '../../assets/img/icons/person-sharp.html'

class DrawerView {
  constructor() {
    this.toggleMain = new Event()
    this.expandSub = new Event()
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

  initSelectors() {
    // Selecting Default Shown DOM Elements
    this.drawer = document.querySelector('#drawerNav')
    this.toggler = document.querySelector('#drawerToggler')
    this.icon = document.querySelector('.drawer__toggler-icon')
    // Nav Top and Bottom
    this.navTop = this.drawer.querySelector('.drawer-nav-top')
    this.navBottom = this.drawer.querySelector('.drawer-nav-bottom')
    // Setting CSS Classes to be reused
    // TODO: Rename __parent
    this.parentBtnClasses = ['drawer-nav__parent', 'button', 'button--transparent']
    // TODO: submenu-toggler conditionally
    this.subBtnClasses = ['drawer-nav__flyout-link', 'submenu-toggler', 'button', 'button--transparent']
    // TODO:
    this.openedSubmenu = document.querySelector('.drawer-nav__flyout--open')
    this.openDetailsCss = 'drawer-nav__flyout--sub-active'
    this.detailsNav = document.querySelector('.drawer__third-level')
  }

  async render(container, menu) {
    container.innerHTML = this.drawerHTML + this.togglerHTML
    await this.initSelectors()
    await this.populateMainNav(menu)
    // console.log(menu) // eslint-disable-line
    // Generar las listas del data
  }

  /**
   *
   * @param {*} item
   * @returns
   */
  addItemIcon(item) {
    // TODO: icon wrapper
    const wrapper = createDiv('drawer-nav__parent-wrapper')
    const imgWrapper = createDiv('drawer-nav__parent-img')

    // drawer-nav__parent-icon
    // drawer__image

    this.icons.forEach(icon => {
      if (icon.name === item.icon) {
        let iconElem
        if (item.isImage) {
          imgWrapper.innerHTML = icon.icon
          wrapper.appendChild(imgWrapper)
          iconElem = imgWrapper.firstElementChild
          iconElem.classList.add('drawer__image')
        } else {
          wrapper.innerHTML = icon.icon
          iconElem = wrapper.firstElementChild
          iconElem.classList.add('drawer-nav__parent-icon')
        }
      }
    })

    // if (item.isImage) {
    //   icon = createIcon(['drawer__image', 'drawer-nav__parent-img'], 'img', item.icon)
    // } else {
    //   icon = createIcon(['drawer-nav__parent-icon', 'fxm-icon'], 'i', item.icon)
    // }
    // wrapper.appendChild(icon)
    // wrapper.
    return wrapper
  }

  populateMainNav(items) {
    items.forEach(item => {
      // console.log(item) // eslint-disable-line
      const listItem = createListItem('drawer-nav__item')
      // TODO: Handler for links anchor href

      const wrapper = this.addItemIcon(item)
      const span = createSpan('drawer-nav__parent-text', item.title)

      let button
      if (item.hasSubmenu) {
        button = createButton(this.parentBtnClasses)
        button.appendChild(wrapper)
        button.appendChild(span)
        listItem.appendChild(button)
        const subMenu = this.populateSubMenus(item)
        listItem.appendChild(subMenu)

      } else {
        button = createAnchor(this.parentBtnClasses, item.url)
        button.appendChild(wrapper)
        button.appendChild(span)
        listItem.appendChild(button)
      }

      if (item.type === 'top') {
        this.navTop.appendChild(listItem)
      } else {
        this.navBottom.appendChild(listItem)
      }
    })
  }

  // TODO: createList method that handles everything
  populateSubMenus(item) {
    const flyout = document.createElement('ul')
    flyout.classList.add('drawer-nav__flyout')
    item.submenu.forEach(sub => {
      const subItem = createListItem('drawer-nav__flyout-item')
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

  // TODO: Fetch Data for clicked Sub Menu Item and populate
  // TODO: Store in cache those that have been fetched
  // TODO: Manage the item that gets scrolled top
  populateThirdMenus() {

  }

  mainTogglerClasses() {
    console.log('main toggler classes')
    this.icon.classList.toggle('hamburger-icon--open')
    this.drawer.classList.toggle('drawer__nav--open')
  }

  // TODO: Support third level menus
  backSubMenu() {
    console.log('back sub menu')
    this.subMenus = [].slice.call(
      document.querySelectorAll('.drawer-nav__flyout')
    )
    function isThirdLevel(element) {
      return element.classList.contains('drawer-nav__flyout--sub-active')
    }
    if (this.subMenus.some(isThirdLevel)) {
      this.openedSubmenu.classList.remove(this.openDetailsCss)
      this.detailsNav.classList.remove('active')
      this.isExpanded = true
    } else {
      this.openedSubmenu.classList.remove('drawer-nav__flyout--open')
      this.icon.classList.remove('hamburger-icon--arrow-left')
      this.isExpanded = false
    }
    // this.subMenus.forEach(submenu => {})
  }

  togglerClick() {
    console.log('Toggler click')
    // TODO: This fires a event, the controller catches it and communicates the modal to fetch data
    this.toggler.addEventListener('click', () => {
      if (this.isExpanded) {
        this.backSubMenu()
      } else {
        this.mainTogglerClasses()
      }
      console.log('click in view triggered from ctrl') // eslint-disable-line
    })
  }

  subMenuClick() {
    console.log('submenu click')
    this.menuItems = [].slice.call(
      document.querySelectorAll('.drawer-nav__parent')
    )
    // TODO: Event Trigger to ctrl=>model
    this.menuItems.forEach(item => {
      item.addEventListener('click', e => { // eslint-disable-line
        this.menuItems.forEach(button => {
          button.parentElement.classList.remove('active')
        })
        item.parentElement.classList.add('active')
        const SubMenu = item.nextElementSibling
        if (SubMenu) {
          this.toggleFlyout(SubMenu)
        } else {
          this.backSubMenu()
        }
      })
    })
  }

  thirdMenuClick() {
    console.log('third menu click')
    this.subTogglers = [].slice.call(
      document.querySelectorAll('.submenu-toggler')
    )
    // TODO: Event Trigger to ctrl=>model
    this.subTogglers.forEach(subToggler => {
      subToggler.addEventListener('click', () => {
        this.toggleThirdLevel(subToggler)
      })
    })
  }

  toggleFlyout(openSubmenu) {
    console.log('toggle flyout')
    // Check if it's diff sub menu item to open
    if (this.openedSubmenu !== openSubmenu) {
      if (this.openedSubmenu) {
        this.openedSubmenu.classList.remove('drawer-nav__flyout--open')
      }
      this.openedSubmenu = openSubmenu
      this.icon.classList.add('hamburger-icon--arrow-left')
      openSubmenu.classList.add('drawer-nav__flyout--open')
      this.isExpanded = true
    } else {
      openSubmenu.classList.remove('drawer-nav__flyout--open')
      this.icon.classList.remove('hamburger-icon--arrow-left')
      this.isExpanded = !this.isExpanded
    }
  }

  toggleThirdLevel(subToggler) {
    console.log('toggle third level')
    let pos = subToggler.getBoundingClientRect().top + window.scrollY
    // console.log(pos)
    // console.log(e)
    // console.log('translate(0, -' + pos + 'px);')
    pos = pos - 10
    const flyout = subToggler.closest('.drawer-nav__flyout--open')
    flyout.classList.toggle(this.openDetailsCss)
    this.detailsNav.classList.toggle('active')
    if (flyout.classList.contains(this.openDetailsCss)) {
      flyout.style.transform = 'translate(0, -' + pos + 'px)'
    } else {
      flyout.style.transform = 'translate(0, 0)'
    }
  }
}

export { DrawerView }
