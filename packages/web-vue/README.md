<div align="center">
  <a href="https://sd.design" target="_blank">
    <img alt="SD Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>SD Design</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 的 Vue UI 组件库。

</div>

# 特性

## 全面

60 多个开箱即用的高质量组件, 可以覆盖绝大部份的业务场景。

## 主题配置

海量的样式 tokens, 支持全局以及组件级别的主题配置。有以下 2 种方式可以定制主题：

- [风格配置平台](https://arco.design/themes) - 推荐!

## TypeScript 友好

所有组件都是用 TypeScript 编写的，所以天然的类型友好。

# 安装

[npm package](https://www.npmjs.com/package/@sdata/web-vue)

```bash
# pnpm
pnpm add @sdata/web-vue

# npm
npm install @sdata/web-vue

# yarn
yarn add @sdata/web-vue
```

# 例子

```typescript
import { createApp } from 'vue';
import SDVue from '@sdata/web-vue';
import App from './App.vue';
import '@sdata/web-vue/dist/sd.css';

const app = createApp(App);
app.use(SDVue);
app.mount('#app');
```

默认组件前缀为 `sd-`，例如 `<sd-button />`、`<sd-form />`。如果需要自定义前缀，可以在 `app.use(SDVue, { componentPrefix: 'YourPrefix' })` 中覆盖。

## 开发

仓库开发强制使用 pnpm workspace。不要在仓库根目录使用 npm 或 yarn 安装、联调或执行脚本。

推荐在仓库根目录执行：

```bash
pnpm install
pnpm run dev
```

常用命令：

```bash
# 根目录：启动组件库 watch + 文档站
pnpm run dev

# 根目录：显式全量开发入口
pnpm run dev:all

# 根目录：仅启动组件库开发构建
pnpm run dev:component

# 根目录：打包整个项目
pnpm run build

# 根目录：显式全量构建入口
pnpm run build:all

# 根目录：仅打包组件库
pnpm run build:component

# 根目录：运行测试
pnpm run test

# 根目录：运行组件测试和截图测试
pnpm run test:all

# 根目录：CI 检查
pnpm run check:ci

# 根目录：CI 构建入口
pnpm run build:ci

# 根目录：CI 测试入口
pnpm run test:ci

# 根目录：发版前全量校验
pnpm run release:check
```

`pnpm run dev`、`pnpm run build`、`pnpm run test` 会调用当前仓库已经切换完成的 Vite+ 和 Vitest 工作流。

如果只想在组件包内执行命令，也可以直接运行：

```bash
pnpm --filter @sdata/web-vue run dev
pnpm --filter @sdata/web-vue run build
pnpm --filter @sdata/web-vue run test
pnpm --filter @sdata/web-vue run test:update
```

# 相关链接

- [暗黑模式](https://69dcb47c8b4208264c6e77c6--sensational-caramel-b44e12.netlify.app/guides/dark)
- [主题配置](https://69dcb47c8b4208264c6e77c6--sensational-caramel-b44e12.netlify.app/guides/theme)
- [Figma 设计资源](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/SD Design%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)

# 参与贡献

贡献之前请先阅读 [行为准则](./CODE_OF_CONDUCT.md) 和 [贡献指南](./CONTRIBUTING.zh-CN.md)。

感谢所有为 SD Design 做过贡献的人!

<a href="https://github.com/liunnn1994/sd-design/graphs/contributors"><img src="https://contrib.rocks/image?repo=sd-design/sd-design" /></a>

# License

[GNU Affero General Public License v3.0](../../LICENSE)
