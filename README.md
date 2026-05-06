<div align="center">
  <h1>SD Design</h1>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f36a9db2-3fd7-4644-8c47-83e0937a4e0c/deploy-status)](https://app.netlify.com/projects/sensational-caramel-b44e12/deploys)

<div align="center">

基于 [Arco Design](https://arco.design/) 的 Vue UI 组件库。

</div>

## 基础架构

本仓库是一个基于 pnpm workspace 的 monorepo，核心包都位于 packages 目录下。

- packages/web-vue：Vue 组件库本体，包含组件源码、构建脚本、文档元数据生成和测试。
- packages/web-vue-debug：组件联调页，作为与 web-vue 同级的最小消费端，用于本地快速验证组件交互和样式。
- packages/sd-vue-docs：基于 Astro Starlight 的文档站，负责当前文档站的开发、构建、MDX 内容和在线示例编辑能力。

根目录脚本主要用于串联组件库和文档站两个包，不再需要单独构建内部工具包。

## 前端核心架构摘要

以 `packages/web-vue` 为核心产物、以 `packages/sd-vue-docs` 为消费与展示层的双包协同架构。根目录负责统一调度，组件库负责产出可发布模块与类型，文档站负责消费这些产物并补齐文档、在线示例和主题运行时联动。

- 技术栈：`pnpm workspace`、`Vue 3`、`TypeScript`、`Vite`、`vite-plus`、`Astro`、`Starlight`、`MDX`。
- 核心分层：根目录调度层、`packages/web-vue` 组件库生产层、`packages/sd-vue-docs` 文档站消费层、vendor 同步桥接层。
- 关键流程：根目录 `dev` 先准备组件库模块与文档站 vendor 资源，再并行启动开发服务；根目录 `check` / `check:ci` 统一兜底格式、lint、测试和全量构建。

详细说明见 [ARCHITECTURE.md](ARCHITECTURE.md)，其中包含：

- 面向新人的上手路径
- 面向维护者的排障索引
- 模块分层与关键流程说明
- 对当前架构取舍的分析判断

## 环境要求

- Node.js >= 24.14.1
- pnpm >= 10.33.0

如果 Node 版本低于推荐值，脚本通常仍可运行，但会看到 engine warning。

## 快速开始

首次安装或依赖升级后，建议按下面顺序执行：

```bash
pnpm install
pnpm run dev
```

其中：

- `pnpm run dev` 会同时启动组件库 watch 构建和文档站开发服务。
- `pnpm run dev:web-vue` 会直接以源码别名启动 `packages/web-vue-debug`，用于组件联调和样式调试，不依赖预先构建产物。
- `pnpm run dev:all` 是 `pnpm run dev` 的全量显式入口，适合脚本编排或新人快速理解流程。
- `pnpm run dev:docs` 只启动文档站。
- `pnpm run check:ci` 适合作为常规 CI 入口；`pnpm run release:check` 复用同一套发布前校验。

## 常用命令

```bash
# 同时启动组件库 watch 和文档站开发环境
pnpm run dev

# 与 dev 等价的全量开发入口
pnpm run dev:all

# 仅启动组件库开发构建
pnpm run dev:component

# 仅启动文档站开发环境
pnpm run dev:docs

# 启动组件源码调试页
pnpm run dev:web-vue

# 打包整个项目（组件库 + 文档站）
pnpm run build

# 与 build 等价的全量构建入口
pnpm run build:all

# 打包组件库
pnpm run build:component

# 打包文档站
pnpm run build:docs

# 格式化整个仓库
pnpm run format

# 与 format 等价的全量格式化入口
pnpm run format:all

# 检查格式是否符合要求
pnpm run format:check

# 运行仓库级代码 lint
pnpm run lint

# 与 lint 等价的全量 lint 入口
pnpm run lint:all

# 自动修复可修复的 lint 问题
pnpm run lint:fix

# 本地快速检查：lint + 单元测试
pnpm run check

# 显式本地检查入口
pnpm run check:local

# CI 安装依赖（锁文件严格模式）
pnpm run install:ci

# CI 检查：格式检查 + lint + 测试 + 全量构建
pnpm run check:ci

# CI 构建入口
pnpm run build:ci

# CI 测试入口
pnpm run test:ci

# 发版前全量校验
pnpm run release:check

# 运行组件库测试
pnpm run test

# 仅运行组件测试
pnpm run test:component

# 全量测试
pnpm run test:all

# 清理 dist 和 node_modules
pnpm run clean
```

## 组件调试页协作方式

`packages/web-vue-debug` 是一个独立于文档站的最小调试应用，目的是在不引入额外状态管理和页面壳子的前提下，以源码别名方式直接消费 `packages/web-vue/components`，专门用于组件联调和样式验证。

当前默认 demo 位于 `packages/web-vue-debug/src/App.vue`，使用 `ColorPicker` 的渐变模式作为初始示例。需要调试其他组件时，优先直接修改这个文件，保持页面尽量简单，只保留当前要验证的组件和最小交互。

推荐协作流程：

```bash
# 1. 安装依赖
pnpm install

# 2. 启动源码调试页
pnpm run dev:web-vue
```

执行后会直接启动 `packages/web-vue-debug` 的 Vite 开发服务，并通过别名把下面这些入口都指向源码：

- `@sdata/web-vue` -> `packages/web-vue/components/index.ts`
- `@sdata/web-vue/es/icon` -> `packages/web-vue/components/icon/index.ts`
- `@web-vue-src` / `@style` / `@components` -> 组件库源码与 Sass 入口

协作约定：

- 调试页代码放在 `packages/web-vue-debug`，不要把这类临时联调逻辑塞进文档站。
- 调试页里按正常项目方式从 `@sdata/web-vue` 引入组件，样式总入口放在 `packages/web-vue-debug/src/main.ts` 中统一导入源码 scss。
- 如需替换 demo，优先改 `packages/web-vue-debug/src/App.vue`；只有在确实需要时再增加少量辅助文件。
- 如果只想保留这个入口的别名，也可以继续使用 `pnpm run dev:color-picker-debug`，它当前等价于 `pnpm run dev:web-vue`。

## 文档编写

- 组件文档最终页面位于 `packages/sd-vue-docs/src/content/docs/components/**/index.mdx`。
- 指南页最终页面位于 `packages/sd-vue-docs/src/content/docs/guides/*.mdx`。
- 组件说明、示例源码和 API 表格统一直接维护在 `packages/sd-vue-docs/src/content/docs/**/*.mdx`。
- 文档站运行时使用的示例组件位于 `packages/sd-vue-docs/src/components/generated/*/*.vue`。
- 页面级调整、排版、链接和指南内容统一直接修改 `packages/sd-vue-docs/src/content/docs/**/*.mdx`。
- 联调时优先使用 `pnpm run dev`；只调文档站可使用 `pnpm run dev:docs`。
- 产线构建验证优先使用 `pnpm run build`；如果只验证站点可使用 `pnpm run build:docs`。
- 日常本地自检优先使用 `pnpm run check`，CI 或发版前验证优先使用 `pnpm run check:ci`。
- 需要发版前全量校验时，优先使用 `pnpm run release:check`。

## 维护说明

- 文档站相关命令会自动准备 web-vue 模块产物和 vendor 资源，不需要再手工执行额外初始化步骤。
- 根脚本 `upgrade:*` 用于批量升级依赖、engines、browserslist 和技能清单，适合做仓库级维护，不适合日常开发流程。

## 浏览器兼容性

<!-- browserslist:start -->

以下版本号基于当前 [Browserslist 配置](https://web.dev/baseline?hl=zh-cn)自动生成：

- and_chr>=118
- and_ff>=118
- chrome>=118
- edge>=118
- firefox>=118
- ios_saf>=17.0
- safari>=17.0

<!-- browserslist:end -->
