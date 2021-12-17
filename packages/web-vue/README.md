<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>
<div align="center">
  <h1>Arco Design</h1>
</div>

<div align="center">

A comprehensive Vue UI components library based on the [Arco Design](https://arco.design/) system.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design-vue/blob/main/LICENSE)

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>

# Features

## Comprehensive

With more than 60 crafted components that you can use out of the box.

## Customizable theme

Extensive theme tokens can be customized to build your own theme. Two ways of customization are supported:

* [With less-loader](https://arco.design/vue/docs/theme)
* [Design Lab](https://arco.design/themes) - Recommended!

## TypeScript friendly

All components are written in TypeScript so it's type friendly.

# Installation

Available as an [npm package](https://www.npmjs.com/package/@arco-design/web-vue)

```bash
// with npm
npm install @arco-design/web-vue

// with yarn
yarn add @arco-design/web-vue
```

# Examples

```typescript
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
```

## Development

1. Use `npm install` to install basic packages such as `lerna` and `yarn`

2. Use `yarn install` to install the dependencies of each package in `workspaces` (If you encounter a `YN0018` error, you can use `YARN_CHECKSUM_BEHAVIOR=update yarn` to install)

3. Use `npm run init` to initialize the project

# Useful Links

* [Documentation website](https://arco.design/)
* [Dark mode](https://arco.design/vue/docs/dark)
* [Theme customization](https://arco.design/vue/docs/theme)
* [Figma component library](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)
* [Awesome Arco](https://github.com/arco-design/awesome-arco)

# Ecosystems

| Project               | Description                                             |
| --------------------- | ------------------------------------------------------- |
| [React Component Library] | A comprehensive React UI components library based on the Arco Design system |
| [Design Lab] | A platform to create and manage your themes with ease. |
| [Material Market] | A platform that provides massive high-quality customized materials to greatly boost development efficiency. |
| [Icon Box] | One-stop platform to manage your icons. |
| [Arco Pro] | A solution to quickly building applications from scratch. |

[React Component Library]: https://arco.design/react/docs/start

[Design Lab]: https://arco.design/themes

[Material Market]: https://arco.design/material

[Icon Box]: https://arco.design/iconbox

[Arco Pro]: https://arco.design/pro/

# Contributing

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md) and
the [Contributing Guide](./CONTRIBUTING.md).

Thank you to all the people who already contributed to ArcoDesign!

<a href="https://github.com/arco-design/arco-design-vue/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design-vue" /></a>

# License

Ths project is [MIT licensed](./LICENSE).
