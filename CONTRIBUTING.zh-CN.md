
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

1. Fork [此仓库](https://github.com/arco-design/arco-design-vue)，从 `main` 创建分支。新功能实现请发 pull request 到 `feature` 分支。其他更改发到 `main` 分支。
2. 使用 `npm install -g` 安装 `lerna` 和 `yarn` 等基础包。
3. 执行 `yarn install` 安装 `workspaces` 中各个包的依赖（如果遇到 `YN0018` 错误，可以使用 `YARN_CHECKSUM_BEHAVIOR=update yarn` 进行安装）。
4. 执行 `npm run init` 初始化项目。
5. 执行 `npm run start` 启动和预览站点.
6. 对代码库进行更改。如果适用的话，请确保写了相应的测试。
7. 确认执行 `npm run test` 后所有的测试都是通过的。
8. 提交 git commit, 请同时遵守 [Commit 规范](#commit-指南)。
9. 提交 pull request, 如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)。

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

本仓库使用lerna管理，包括以下packages：

1. `web-vue`: Vue组件库
2. `vue-site`: Vue组件库文档站
3. `arco-vue-scripts`: Vue组件库脚本
4. `arco-vue-md-loader`: Vue组件库中markdown文档的webpack loader
5. `arco-vue-site-nav`: Vue组件库文档站的顶部导航栏（使用React物料）

### Web-Vue 组件目录

> components/componentName

```
├── README.zh-CN.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── README.en-US.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── TEMPLATE.md （用于生成 README 文件的模板）
├── __test__
│   ├── __snapshots__
│   │   └── demo.test.js.snap
│   ├── demo.test.ts (快照测试)
│   └── index.test.ts （单元测试）
├── __demo__ （组件演示）
│   ├── basic.md
│   └── advanced.md
├── index.tsx（组件导出）
└── style
    └── index.less（组件样式）
    └── index.ts (组件样式导出)
```

请注意: 如果进行了会影响 README 的变更（例如 API 变更），请确保运行 `npm run docgen` 来更新组件的 README。

组件库的相关操作在`web-vue`目录下操作.

## License

[MIT 协议](./LICENSE).
