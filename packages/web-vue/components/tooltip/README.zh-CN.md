```yaml
meta:
  type: 组件
  category: 数据展示
title: 文字气泡 Tooltip
description: 鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。
```

@import ./__demo__/basic.md

@import ./__demo__/mini.md

@import ./__demo__/position.md

@import ./__demo__/color.md

`<tooltip>` 组件继承 `<trigger>` 组件的全部属性

## API


### `<tooltip>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|popup-visible **(v-model)**|文字气泡是否可见|`boolean`|`-`|
|default-popup-visible|文字气泡默认是否可见（非受控模式）|`boolean`|`false`|
|content|文字气泡内容|`string`|`-`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|mini|是否展示为迷你尺寸|`boolean`|`false`|
|background-color|弹出框的背景颜色|`string`|`-`|
|content-class|弹出框内容的类名|`ClassName`|`-`|
|content-style|弹出框内容的样式|`CSSProperties`|`-`|
|arrow-class|弹出框箭头的类名|`ClassName`|`-`|
|arrow-style|弹出框箭头的样式|`CSSProperties`|`-`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|
### `<tooltip>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|文字气泡显示状态改变时触发|visible: `boolean`|
### `<tooltip>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|content|内容|-|


