```yaml
meta:
  type: 组件
  category: 通用
title: 全局配置 ConfigProvider
description: 在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。
```

@import ./__demo__/basic.md

## API


### `<config-provider>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|is-global|是否全局生效|`boolean`|`false`||
|prefix-cls|组件类名前缀|`string`|`'arco'`||
|locale|配置语言包|`ArcoLang`|`-`||
|size|大小|`Size`|`-`|2.14.0|

`is-global`属性为`true`时，需要将组件以插件形式进行安装才可生效。一般用于解决通过导入Modal使用Modal本身调用时，全局的多语言无法生效的问题。

```ts
import { createApp } from 'vue'
import ArcoVue, { Modal, ConfigProvider } from '@arco-design/web-vue';

const app = createApp(App);
Modal._context = app._context;
app.use(ConfigProvider) // 或 app.use(ArcoVue)
````