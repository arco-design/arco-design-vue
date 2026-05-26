<div align="center">
  <img height="180" src="https://raw.githubusercontent.com/liunnn1994/sd-design/refs/heads/main/packages/sd-vue-docs/public/logo-icon.png">
</div>

<div align="center">
  <img height="40" src="https://raw.githubusercontent.com/liunnn1994/sd-design/refs/heads/main/packages/sd-vue-docs/public/logo-text.png">
</div>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/f36a9db2-3fd7-4644-8c47-83e0937a4e0c/deploy-status)](https://app.netlify.com/projects/sensational-caramel-b44e12/deploys?branch=main) [![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=flat&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/liunnn1994/sd-design)

</div>

---

SD Design 是一个基于 Vue 3 的现代企业级组件库。本项目采用 pnpm workspace 架构组织，实现了组件源码、调试环境和文档站的紧密协同。

## 🎯 导读与快速开始

- 想要快速启动项目、了解本地开发流，请直接阅读 **[QUICK-START.md](QUICK-START.md)**。
- 想要深入理解项目构建流程、模块分层及设计理念，请阅读 **[ARCHITECTURE.md](ARCHITECTURE.md)**。

## 🏗️ 基础架构摘要

本仓库通过在根目录统一进行脚本调度，将前端产物的生产（组件库）和消费（文档站）解耦但又紧密关联。

核心包包括：

- `packages/web-vue`：组件库生产层。产出 UMD、ESM 模块，及相关的 IDE 元数据。
- `packages/sd-vue-docs`：文档站消费层。基于 Astro 组织构建组件文档及在线演示。
- `packages/web-vue-debug`：轻量级调试环境。开发单组件时可直接基于此包快速热更和联调。

## ⚙️ 环境要求

- Node.js >= 24.16.0
- pnpm >= 11.0.9

## 💻 常用命令概览

完整的命令及解释请参考 `QUICK-START.md`，这里列出日常最高频的命令：

```bash
# 安装依赖
pnpm install

# 启动完整的本地开发环境 (含组件库 Watch 与文档站服务)
pnpm run dev

# 启动组件独立调试页面 (最快体验组件修改)
pnpm run dev:web-vue

# 本地代码规范检查、类型校验及单元测试
pnpm run check

# 发版前的统一检验流程 (强制通过)
pnpm run check:ci
```

## 🌐 浏览器兼容性

<!-- browserslist:start -->

以下版本号基于当前 [Browserslist 配置](https://web.dev/baseline?hl=zh-cn)自动生成：

- and_chr>=119
- and_ff>=120
- chrome>=119
- edge>=119
- firefox>=120
- ios_saf>=17.0
- safari>=17.0
<!-- browserslist:end -->

## 📜 许可与规范

本项目遵循 [AGPL-3.0-only](LICENSE) 开源协议。如需贡献代码，请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 和 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。
