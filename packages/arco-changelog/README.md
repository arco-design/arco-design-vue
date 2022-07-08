# Arco Changelog

A simple github changelog generator

## Installation

```
npm install @arco-design/arco-changelog
```

## Command

+ `arco-changelog`

生成日志文件

+ `arco-changelog template`
  + `--gitlab` 生成 Gitlab 项目的 MR 模板

在项目中创建 Github 的 Pull Request 模板

## Usage

1. Create a 'changelog.config.js' file and fill in the necessary config. You can find all configuration properties below

```js
// changelog.config.js

module.exports = {
  repo: 'arco-design/arco-design-vue'
}

```

2. run `arco-changelog`

## Config Options

### repo

+ Type: string
+ Required

用于获取 Pull Request 的项目地址

### type

+ Type: String
+ Default: "github"

指定项目仓库的类型

### merged

+ Type: boolean
+ Default: true

是否只获取合并过的 PR

### requestConfig

+ Type: Function `(config: {
  repo: string;
  version: string;
  merged: boolean;
  }) => AxiosRequestConfig`
+ Default: undefined

自定义请求信息，返回结果可参考 [axios](https://github.com/axios/axios#request-config)

### emitFiles

+ Type: Function `(changelog: Changelog) => EmitFile[]`
+ Default: undefined

生成更新日志文件的方法

changelog 工具使用 [nunjucks](https://mozilla.github.io/nunjucks/) 作为模板引擎。返回数据中的 `template` 字段指定模板文件的位置，`data` 字段指定模板数据

### filename

+ Type: Object `{ zh: string; en: string }`
+ Default: undefined

指定默认配置生成日志文件的文件名，分为中英文文件。例如：`{ zh: 'changelog/CHANGELOG.zh.md'; en: 'changelog/CHANGELOG.en.md' }`

```ts
export interface EmitFile {
  file: string;
  template: string;
  data: Record<string, any>;
}

export interface Changelog {
  version: string;
  date: string;
  list: ChangelogData[];
}

export interface ChangelogData {
  type: string;
  pr: PullRequest;
  issues?: string[];

  [key: string]: any;
}

export interface PullRequest {
  id: number;
  url: string;
}
```

### typeDict

+ Type: Object
+ Default: typeDict

更新日志的类型字典

```js
const typeDict = {
  feature: 'New feature',
  bugfix: 'Bug fix',
  docs: 'Documentation change',
  refactor: 'Refactoring',
  style: 'Component style change',
  enhancement: 'Enhancement',
  test: 'Test cases',
  ci: 'Continuous integration',
  typescript: 'Typescript definition change',
  attention: 'Breaking change',
}
```

### keyDict

+ Type: Object
+ Default: keyDict

更新日志数据的 key 所对应的表格标题字典

```js
const keyDict = {
  type: 'Type',
  component: 'Component',
  changelogZh: 'Changelog(CN)',
  changelogEn: 'Changelog(EN)',
  issues: 'Related issues',
}
```
