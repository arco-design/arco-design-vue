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
|prefix-cls|组件类名前缀|`string`|`'arco'`||
|locale|配置语言包|`ArcoLang`|`-`||
|size|大小|`Size`|`-`|2.14.0|
|global|是否全局生效|`boolean`|`false`|2.25.0|
|update-at-scroll|是否在容器滚动时更新弹出框的位置|`boolean`|`false`|2.25.0|




## FAQ

### 全局配置

`global` 属性设置为 `true` 时，会将配置内容注入到 Vue AppContext 中，一般用于解决使用 Modal、Message 组件的函数式调用方法时，配置内容无法生效的问题。
