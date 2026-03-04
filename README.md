# DataVirtualisation

An AngularJS application for interactive data visualisation, built with Angular Material and Plotly.js. It renders geospatial scatter-geo maps of process/capacity data and provides a searchable, filterable chemical/process selector.

## Features

- **Interactive geo maps** – scatter-geo charts rendered via [Plotly.js](https://plotly.com/javascript/) showing process capacity locations across the USA.
- **Searchable selector** – filterable multi-select dropdown backed by Angular Material, linked to the map data.
- **Modular AngularJS architecture** – follows [John Papa's AngularJS style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) with named functions, IIFE wrapping, and `controllerAs` syntax.
- **Angular Material UI** – responsive layout built with `ngMaterial`, `ngMdIcons`, and UI Router.
- **Grunt-powered workflow** – development server with live-reload, JSHint linting, asset concatenation, and uglification.
- **Unit tests** – Karma + Jasmine test suite.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [AngularJS 1.x](https://angularjs.org/) |
| UI library | [Angular Material](https://material.angularjs.org/) |
| Charts | [Plotly.js](https://plotly.com/javascript/) + [angular-plotly](https://github.com/alonbardavid/angular-plotly) |
| Data utilities | [D3.js v3](https://d3js.org/), [JSOG](https://github.com/bhilstrom/jsog) |
| Routing | [UI-Router](https://ui-router.github.io/ng1/) |
| Build | [Grunt](https://gruntjs.com/), [Bower](https://bower.io/) |
| Tests | [Karma](https://karma-runner.github.io/) + [Jasmine](https://jasmine.github.io/) |

## Prerequisites

- **Node.js** `0.10.x` (or a compatible LTS version)
- **npm** `1.4.x`+
- **Grunt CLI** – `npm install -g grunt-cli`
- **Bower** – `npm install -g bower`

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Skitionek/DataVirtualisation.git
cd DataVirtualisation

# 2. Install Node dependencies (bower install runs automatically via postinstall)
npm install

# 3. Start the development server (live-reload on http://localhost:4000)
npm start          # runs: grunt
# or explicitly
grunt dev
```

The `grunt dev` task:
1. Injects all source scripts and bower components into `index.html`.
2. Starts a `connect` server on port **4000** and opens the app in your browser.
3. Watches `app/modules/**/*.js` for changes and re-runs JSHint on save.

## Project Structure

```
DataVirtualisation/
├── app/
│   ├── app.js               # Main Angular module declaration
│   ├── app.config.js        # App-level configuration
│   ├── assets/              # Compiled CSS, JS bundles, images
│   └── modules/
│       ├── data/            # Raw data files (JSON / CSV)
│       ├── filter/          # Filter bottom-sheet controller
│       ├── home/            # Home module (route, controller, service, view)
│       ├── layouts/         # Shared layout components (nav-bar, side-nav, main-page)
│       └── plots/           # Plots module (route, controller, service, view)
├── src/
│   └── bower_components/    # Front-end dependencies installed by Bower
├── Gruntfile.js             # Build & development task definitions
├── bower.json               # Front-end dependency manifest
├── package.json             # Node dependency manifest & npm scripts
├── karma.conf.js            # Test runner configuration
└── index.html               # Application entry point
```

## Build

```bash
# Production build – lint, concatenate, minify, inject, and clean
grunt build
```

The `grunt build` task:
1. Runs **JSHint** on all application JavaScript.
2. Installs bower components via `bower-installer`.
3. Concatenates app source files into a single bundle.
4. Pre-caches Angular templates with `grunt-angular-templates`.
5. Injects production bundles into `index.html`.
6. Starts the concurrent server.
7. Cleans the `src/` directory.

## Running Tests

```bash
npm test
# or
karma start karma.conf.js
```

Tests are co-located with their modules (e.g. `app/modules/home/home-test.js`).

## Data

The application loads JSON data from `app/modules/data/`:

| File | Description |
|------|-------------|
| `data.jsog.json` | Location/process data encoded in [JSOG](https://github.com/bhilstrom/jsog) format |
| `process_capacity_locations_updated.json` | Process capacity data used for the scatter-geo map |
| `process_capacity_locations_preformated.json` | Pre-formatted version of the capacity data (matches original filename) |
| `data.csv` | Raw CSV source |

## License

[MIT](LICENSE.md) © Skitionek
