
> [English](./CONTRIBUTING.md) | 简体中文

# 贡献指南

感谢你的宝贵时间。你的贡献将使这个项目变得更好！在提交贡献之前，请务必花点时间阅读下面的入门指南。

## 行为准则

该项目有一份 [行为准则](./CODE_OF_CONDUCT.md)，希望参与项目的贡献者都能严格遵守。

## 透明的开发

所有工作都直接透明地在 GitHub 上进行。核心团队成员和外部贡献者的 pull requests 都需要经过相同的 review 流程。

## 语义化版本

该项目遵循语义化版本。我们对重要的漏洞修复发布修订号，对新特性或不重要的变更发布次版本号，对重大且不兼容的变更发布主版本号。

每个重大更改都将记录在 changelog 中。

## 报告 Issues

我们使用 [Github issues](https://github.com/arco-design/arco-design-vue/issues) 进行 bug 报告和新 feature 建议。在报告 bug 之前，请确保已经搜索过类似的 [问题](https://github.com/arco-design/arco-design-vue/issues)，因为它们可能已经得到解答或正在被修复。新问题应通过 [问题助手](https://arco.design/issue-helper?repo=arco-design-vue) 提交。对于 bug 报告，请包含可用于重现问题的代码。对于新 feature 建议，请指出你想要的更改以及期望的行为。

## 提交 Pull Request

本项目使用 [pnpm](https://pnpm.io/zh/) 进行多包管理，请在开发前准备好开发环境。

### 共建流程
- 认领 issue： 在 github 建立 issue 并认领（或直接认领已有 issue），告知大家自己正在修复，避免重复工作。
- 项目开发：在完成开发前准备后，进行 bug 修复或功能开发。
- 添加单测：针对代码变动添加单元测试，确认测试用例通过，尽量保证一定的测试覆盖率。
- 更新快照：如果涉及到组件 dom 层级变动，类名增删或新增/删除了 Demo，快照需要重新生成更新。
- 文档生成：组件 API 存在调整时需执行 `pnpm run docgen` 重新生成文档。
- 提交 PR

### 开发

1. Fork [此仓库](https://github.com/arco-design/arco-design-vue)，从 `main` 创建分支。新功能实现请发 pull request 到 `feature` 分支。其他更改发到 `main` 分支。

```bash
git clone git@github.com:arco-design/arco-design-vue.git
```

2. 安装 `workspaces` 中各个包的依赖。

```bash
pnpm install
```

3. 初始化项目

```bash
pnpm run init
```

4. 启动和预览站点

```bash
pnpm run start
```

```bash
# 启动 storybook 。 这里启动不启动都可以，官网也可以调试组件
pnpm run storybook
```

5. 对代码库进行更改。如果适用的话，请确保写了相应的测试。
6. 确认执行 `pnpm run test` 后所有的测试都是通过的。
7. 提交 git commit, 请同时遵守 [Commit 规范](#commit-指南)。
8. 提交 pull request, 如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)。

## Commit 指南

Commit messages 请遵循[conventional-changelog 标准](https://www.conventionalcommits.org/en/v1.0.0/)：

```bash
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

### Commit 类型

以下是 commit 类型列表:

- feat: 新特性或功能
- fix: 缺陷修复
- docs: 文档更新
- style: 代码风格或者组件样式更新
- refactor: 代码重构，不引入新功能和缺陷修复
- perf: 性能优化
- test: 单元测试
- chore: 其他不修改 src 或测试文件的提交

## Web-Vue 项目结构

本仓库多包管理，包括以下packages：

1. `web-vue`: Vue组件库
2. `vue-site`: Vue组件库文档站
3. `arco-vue-scripts`: Vue组件库脚本
4. `arco-vue-md-loader`: Vue组件库中markdown文档的webpack loader
5. `arco-vue-site-nav`: Vue组件库文档站的顶部导航栏(使用React物料)

### Web-Vue 组件目录

> components/componentName

```
├── README.zh-CN.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── README.en-US.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── TEMPLATE.md (用于生成 README 文件的模板)
├── __test__
│   ├── __snapshots__
│   │   └── demo.test.js.snap
│   ├── demo.test.ts (快照测试)
│   └── index.test.ts (单元测试)
├── __demo__ (组件演示)
│   ├── basic.md
│   └── advanced.md
├── index.tsx(组件导出)
└── style
    └── index.less(组件样式)
    └── index.ts (组件样式导出)
```

请注意: 如果进行了会影响 README 的变更(例如 API 变更)，请确保运行 `pnpm run docgen` 来更新组件的 README。

组件库的相关操作在`web-vue`目录下操作.

## License

[MIT 协议](./LICENSE).
