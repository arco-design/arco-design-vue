```yaml
meta:
  type: Arco Pro 最佳实践
title: 快速开始
description: 请跟随以下步骤创建 Arco Design Pro
```

## 环境

开始开发之前，请确认本地环境中安装好了 `node`， `git` 和 `arco cli`。

其中 `arco cli` 是安装项目模版的工具，请运行以下命令安装：

```bash
npm i -g arco-cli
```

## 技术栈

本项目的技术栈为 `vue` + `ES2015+` + `TypeScript` +  `Arco Design ` 和 `echarts`等，提前学习和了解这些知识将帮助你更好地上手我们的项目。

## 安装

这一步是以 Arco Design Pro 为模版创建一个新的项目，请按照以下步骤进行：

-   进入到一个文件夹，新建项目

```bash
cd someDir
arco init hello-arco-pro
```

-   选择 技术栈

```bash
 ? 请选择你希望使用的技术栈
   React
 ❯ Vue
```

-   选择 `arco-design-pro` 分类

```bash
 ? 请选择一个分类
   业务组件
   组件库
   Lerna Menorepo 项目
 ❯ Arco Pro 项目
```

等待安装依赖。。。

看到以下输出就是创建成功了

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8b78dd4bbdba4bf7939bd0a131357b31~tplv-uwbnlip3yd-image.image)

## 开发

进入到项目中，运行代码

```bash
cd hello-arco-pro

npm run dev
```

打开 [localhost:3000](http://localhost:3000) 就能看到如下页面

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1e331a3b8e2446e2be6c78b1c86e5e50~tplv-uwbnlip3yd-image.image)
