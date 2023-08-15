```yaml
meta:
  type: 组件
  category: 通用
title: 全局配置 ConfigProvider
description: 在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。
```

@import ./__demo__/basic.md

@import ./__demo__/empty.md

## API


### `<config-provider>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|prefix-cls|组件类名前缀|`string`|`'arco'`||
|locale|配置语言包|`ArcoLang`|`-`||
|size|大小|`Size`|`-`|2.14.0|
|global|是否全局生效|`boolean`|`false`|2.25.0|
|update-at-scroll|是否在容器滚动时更新弹出框的位置|`boolean`|`false`|2.25.0|
|scroll-to-close|是否在滚动时关闭弹出框|`boolean`|`false`|2.46.0|
|exchange-time|是否交换时间|`boolean`|`true`|2.48.0|
### `<config-provider>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|loading|自定义加载中元素|-|2.28.0|
|empty|自定义空状态元素|component: `string`|2.28.0|




## FAQ

### 全局配置

`global` 属性设置为 `true` 时，会将配置内容注入到 Vue AppContext 中，一般用于解决使用 Modal、Message 组件的函数式调用方法时，配置内容无法生效的问题。

### 自定义空状态展示

可以在 `#empty` 中自定义组件库全局的空状态展示，如果在插槽中使用到了 `Empty` 组件，需要开启 `inConfigProvider` 属性。
