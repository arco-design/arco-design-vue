```yaml
meta:
  type: Arco Pro
title: Quick start
description: Please follow the steps below to create Arco Design Pro
```

*Auto translate by google.*

## Environment

Before starting development, please make sure that `node`, `git` and `arco cli` are installed in the local environment.

Among them, `arco cli` is a tool for installing project templates, please run the following command to install:

```bash
npm i -g @arco-design/arco-cli
```

## Technology Stack

The technology stack of this project is `vue` + `ES2015+` + `TypeScript` + `Arco Design` and `echarts`, etc. Learning and understanding this knowledge in advance will help you get started with our project better .

## Install

This step uses Arco Design Pro as a template to create a new project, please follow the steps below:

- Go to a folder and create a new project

```bash
cd someDir
arco init hello-arco-pro
```

- Choose a technology stack

```bash
 ? Please select the technology stack you wish to use
   React
 ❯ Vue
```

- Choose `arco-design-pro` category

```bash
 ? please choose a category
   Business component
   Component library
   Lerna Menorepo project
 ❯ Arco Pro project
```

Wait for the dependencies to be installed. . .

When you see the following output, the creation is successful

![](https://tech-proxy.bytedance.net/tos/images/1641465973343_8ae499ee698dc0e226b061ef206b329d)

## Development

Enter the project, run the code

```bash
cd hello-arco-pro

npm run dev
```

Open [localhost:3000](http://localhost:3000) and you will see the following page

![](https://tech-proxy.bytedance.net/tos/images/1641465973399_9b4916c858df7470a06ebede8aa2f4b4)
