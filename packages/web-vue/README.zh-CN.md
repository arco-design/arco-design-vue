<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>Arco Design</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 的 Vue UI 组件库。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design-vue/blob/main/LICENSE)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

# 特性

## 全面

60多个开箱即用的高质量组件, 可以覆盖绝大部份的业务场景。

## 主题配置

海量的样式 tokens, 支持全局以及组件级别的主题配置。有以下2种方式可以定制主题：

* [Less-loader](https://arco.design/vue/docs/theme)
* [风格配置平台](https://arco.design/themes) - 推荐!

## TypeScript 友好

所有组件都是用 TypeScript 编写的，所以天然的类型友好。

# 安装

[npm package](https://www.npmjs.com/package/@arco-design/web-vue)

```bash
// npm
npm install @arco-design/web-vue

// yarn
yarn add @arco-design/web-vue
```

# 例子

```typescript
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
```

## 开发

1. 使用 `npm install -g` 安装 `lerna` 和 `yarn` 等基础包

2. 使用 `yarn install` 安装 `workspaces` 中各个包的依赖（如果遇到 `YN0018` 错误，可以使用 `YARN_CHECKSUM_BEHAVIOR=update yarn` 进行安装）

3. 使用 `npm run init` 初始化项目


# 相关链接

* [官网](https://arco.design/)
* [暗黑模式](https://arco.design/vue/docs/dark)
* [主题配置](https://arco.design/vue/docs/theme)
* [Figma 设计资源](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)
* [Awesome Arco](https://github.com/arco-design/awesome-arco)

# 生态

| 项目               | 介绍                                             |
| --------------------- | ------------------------------------------------------- |
| [React 组件库] | 基于 [Arco Design](https://arco.design/) 的 React UI 组件库。 |
| [风格配置平台] | 精确到组件级的主题视觉配置平台 |
| [物料平台] | 丰富可共享的业务定制物料，让效率突破猛进 |
| [图标平台] | 一站式图标管理平台 |
| [Arco Pro] | 快速构建中后台的前端解决方案 |

[React 组件库]: https://arco.design/react/docs/start
[风格配置平台]: https://arco.design/themes
[物料平台]: https://arco.design/material
[图标平台]: https://arco.design/iconbox
[Arco Pro]: https://arco.design/pro/

# 参与贡献

贡献之前请先阅读 [行为准则](./CODE_OF_CONDUCT.md) 和 [贡献指南](./CONTRIBUTING.zh-CN.md)。

感谢所有为 ArcoDesign 做过贡献的人!

<a href="https://github.com/arco-design/arco-design-vue/graphs/contributors"><img src="https://contrib.rocks/image?repo=arco-design/arco-design-vue" /></a>

# License

[MIT 协议](./LICENSE)
