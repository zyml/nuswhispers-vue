# NUSWhispers (Vue Port)
[![GitHub stars](https://img.shields.io/github/stars/zyml/nuswhispers-vue.svg)](https://github.com/zyml/nuswhispers-vue/stargazers)
[![Dependency Status](https://gemnasium.com/zyml/nuswhispers-vue.svg)](https://gemnasium.com/zyml/nuswhispers-vue)
[![Build Status](https://travis-ci.org/zyml/nuswhispers-vue.svg)](https://travis-ci.org/zyml/nuswhispers-vue)
[![Coverage Status](https://coveralls.io/repos/github/zyml/nuswhispers-vue/badge.svg)](https://coveralls.io/github/zyml/nuswhispers-vue)

> Vue + TypeScript port of NUSWhispers' front-end application.

A personal experiment to replicate [NUSWhispers](https://www.nuswhispers.com)'s front-end application using [Vue](https://vuejs.org).

**Warning:** This is a WORK IN PROGRESS! It is undecided whether this web application will replace the existing one.

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1495648/26460491/6015e780-41ac-11e7-9ced-db8496e6d9ff.png" alt="Screenshot" width="100%" />
  <strong><a target="_blank" href="https://nuswhispers-vue.herokuapp.com/">Live Demo</a></strong>
</p>

---

## Feature Parity Checklist
- [x] Core Layout
- [x] Featured
- [x] Latest
- [x] Popular
- [x] Categories
- [x] Tags
- [x] Single Confession
- [x] Search
- [x] Submit Confession
- [x] Privacy Policy
- [ ] Authentication
- [ ] Favorites
- [ ] Likes
- [ ] Comments

## (Hipster) Checklist
- [x] TypeScript
- [x] TSLint
- [x] Vue
- [x] Vue Router
- [x] Vuex
- [x] ESLint (internal scripts only)
- [x] No jQuery / Bootstrap
- [x] CSS Modules
- [x] SVG Sprites
- [ ] Autotrack (GA)
- [x] Webpack 2
- [x] Code Splitting
- [x] Jest
- [x] Travis CI
- [ ] Code Coverage
- [x] Service Workers
- [ ] E2E
- [x] Yarn
- [x] Server-side Rendering (SSR)
- [x] Title / Meta Management
- [ ] > 90 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) Score

## Requirements
- Node 7.0+

## Install / Build
1. Copy `.env.example` as `.env` and fill in the keys.
2. Run any of the following commands:

``` bash
# Install dependencies
yarn

# Build
yarn run build

# Run server at http://localhost:8090/
yarn run start

# Run development server at http://localhost:8090/
yarn run watch
```

## Credits
- [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
- [vue-typescript-jest](https://github.com/locoslab/vue-typescript-jest)
- [Vue.js Server-Side Rendering Guide](https://ssr.vuejs.org/en/)
- [Jest for all: Episode 1 — Vue.js](https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186)

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
