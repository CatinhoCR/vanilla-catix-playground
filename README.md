# music-platform-templates

Self opinionated project organization and build process, further info and details below.
Starter (boilerplate) front-end development project to quickly kickstarting simple Single Page Applications.
Meant to be used for templating or prototyping.
Built for creating project's styleguides and templates on HTML,SCSS and ES6+ (with Babel).
Uses Webpack for hot reloading and building assets.
Uses es-lint and stylelint for linting.
Testing will be added later.

## Table of Contents

- [music-platform-templates](#music-platform-templates)
  - [Table of Contents](#table-of-contents)
  - [Dependencies](#dependencies)
  - [Install](#install)
  - [Development](#development)
  - [Production and Testing](#production-and-testing)
    - [Project Structure](#project-structure)
    - [Styles](#styles)
      - [Using NPM instead of Yarn](#using-npm-instead-of-yarn)

## Dependencies

- Node.js (and NPM)
- Yarn is optional, [see here](#using-npm-instead-of-yarn).

## Install

Clone the repository, on the root folder run

```bash
yarn install
```

If you prefer using NPM for any reason, [see here](#using-npm-instead-of-yarn).

## Development

```bash
npm run start
```

## Production and Testing

This is yet to be done. Basic scripts added for future reference.

### Project Structure

Uses an (M)VC approach to create the different pieces, each of the styleguide's sections would be broken down into separate folders for ease of reference and later adaptation to whatever other framework or platform the project will be built with.

- The `./app` folder holds all the HTML and JS relevant to each section.
- The `index.html` has the main containers where content will be added from each component.
- The `app.js` is the main file, imports the root components and initializes them. Also instantiates the main Views container, where all pages/blocks/components will live.
- The `routes.js` file defines the routing for SPA views to populate.
- Routing code is at `./app/_config`.
- The `./app/helpers` folder holds quite a few utilities to be used, including an events interface (`./app/helpers/events.js`) to help the controllers communicate with the model and the view and update data/views as needed.
- The controllers (`component.ctrl.js`) imports the view file (`component.view.js`) and (if needed) the Model also (`component.model.js`).
- The view imports the HTML file corresponding to that component and handles populating it's content and managing user input.

Each view and block/component has it's own dedicated folder within the `/app` folder.
A cleaner re-organize may be coming soon, stay tuned.

### Styles

Class naming using [BEM standards and conventions](http://getbem.com/introduction/).
Folder organization is an adaptation from the **7:1 approach, from the official SASS styleguide**, but using only 6 folders instead of 7 (The vendors all get imported to a single file. if any). Details on each below (A-Z):

- Abstracts: Things that won't get compiled into CSS on their own. Variables, Mixins, Functions, etc.
- Base: Normalizers and boilerplate toolkit for the project. Things like typography rules and Utility classes go here. Note that the vendors are also imported here on a single file.
- Blocks: Bigger pieces that belong to a page, usually full-width blocks that are direct children of the page/view itself.
- Components: Smaller reusable pieces that are children of blocks. Things like buttons, cards, forms, etc.
- Helpers: This are used for overriding and assigning grid columns, colors and spacings. Initial work on this was inspired by (and adapted from) Tailwind.CSS' approach.
- Layout: Meant to be used for single pages overrides and the general site's theming.

#### Using NPM instead of Yarn

If, for any reason, you prefer to use NPM instead of Yarn, do this:

- Remove the `yarn.lock` file from the root folder
- Remove the `preinstall` and `checkyarn` scripts from the `package.json` file
- Run `npm install`
