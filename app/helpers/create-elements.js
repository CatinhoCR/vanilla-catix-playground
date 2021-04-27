// @todo standarize this. Currently holds 3 dif implementations, need to cleanup and update app-wide

function createDOMElement(elem, cssClasses = [], txt = '', cssId = '') {
  if(!elem) {
    return
  }
  const element = document.createElement(elem)
  if (cssClasses.length >= 1) {
    addCssClasses(element, cssClasses)
  }
  if (cssId) {
    element.setAttribute('id', cssId)
  }
  if (txt) {
    const text = document.createTextNode(txt)
    element.appendChild(text)
    // element.innerHTML = txt
  }

  return element
}

// function addCssClasses(element, cssClasses) {
//   if (!element || !cssClasses) {
//     return
//   }
//   if (typeof cssClasses !== 'string') {
//     for (let i = 0; i < cssClasses.length; i++) {
//       element.classList.add(cssClasses[i])
//     }
//   } else {
//     element.classList.add(cssClasses)
//   }
// }


// @todo
function createSVGicon (icon) {
  return icon
}

// @todo
function mapAttrValues() {} // eslint-disable-line


/**
 * Checks wether a given "string" is a DOM element
 *
 * @param {*} element - The DOM element to validate if exists
 * @returns {Boolean}
 */
function isElement(element) { // eslint-disable-line
  return element instanceof Element || element instanceof HTMLDocument
}

/**
 *
 * @param {String} element - The DOM element to which CSS class(es) will be added
 * @param {String | Array} cssClasses - String or Array of CSS classes to add to Element
 */
function addCssClasses(element, cssClasses) {
  // @todo validate element is a DOM element and can be added classes

  if (typeof cssClasses !== 'string') {
    for (let i = 0; i < cssClasses.length; i++) {
      element.classList.add(cssClasses[i])
    }
  } else {
    element.classList.add(cssClasses)
  }
}

/**
 * All This below is the old implementation
 * Now being replaced for the code aboce this comment
 * @deprecated
 * @see code above this comment for new implementation
 * @todo replace all references using any of the below functions to use above
 */

function createList(parentCss, items, childCss) { // eslint-disable-line
  // , dataName, dataVal
  const list = document.createElement('ul')
  addCssClasses(list, parentCss)
  // list.setAttribute(dataName, dataVal)

  for (let i = 0; i < items.length; i++) {
    // TODO: this.createListItem?
    // TODO: append child function?
    list.appendChild(items[i])
  }
}

function createListItem(cssClass) {
  // , dataName, dataVal, content
  const listItem = document.createElement('li')
  addCssClasses(listItem, cssClass)
  return listItem
  // listItem.setAttribute(dataName, dataVal)
  // listItem.appendChild(content)
}

function createButton(cssClass) {
  // , dataName, dataVal, content
  const btn = document.createElement('button')
  // btn.classList.add(cssClass)
  addCssClasses(btn, cssClass)
  // btn.setAttribute(dataName, dataVal)
  // btn.appendChild(content)
  return btn
}

function createAnchor(cssClass, url) {
  const anchorLink = document.createElement('a')
  addCssClasses(anchorLink, cssClass)
  anchorLink.href = url
  return anchorLink
}

function createIcon(cssClass, type, src) {
  const icon = document.createElement(type)
  addCssClasses(icon, cssClass)
  icon.src = src
  return icon
}

function createSpan(cssClass, text) {
  const span = document.createElement('span')
  addCssClasses(span, cssClass)
  span.innerHTML = text
  return span
}

function createDiv(cssClass) {
  const div = document.createElement('div')
  addCssClasses(div, cssClass)
  return div
}

export {
  createDOMElement,
  createSVGicon,
  createList,
  createListItem,
  createButton,
  createAnchor,
  createIcon,
  createSpan,
  createDiv,
}
