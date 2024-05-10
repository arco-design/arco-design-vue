```yaml
meta:
  type: 组件
  category: 反馈
title: 气泡确认框 Popconfirm
description: 点击元素，弹出气泡式的确认框。
```

@import ./__demo__/basic.md

@import ./__demo__/custom.md

@import ./__demo__/position.md

@import ./__demo__/type.md

`<popconfirm>` 组件继承 `<trigger>` 组件的全部属性

## API


### `<popconfirm>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|content|内容|`string`|`-`|
|position|弹出位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|popup-visible **(v-model)**|气泡确认框是否可见|`boolean`|`-`|
|default-popup-visible|气泡确认框默认是否可见（非受控模式）|`boolean`|`false`|
|type|气泡确认框的类型|`'info' \| 'success' \| 'warning' \| 'error'`|`'info'`|
|ok-text|确认按钮的内容|`string`|`-`|
|cancel-text|取消按钮的内容|`string`|`-`|
|ok-loading|确认按钮是否为加载中状态|`boolean`|`false`|
|ok-button-props|确认按钮的Props|`ButtonProps`|`-`|
|cancel-button-props|取消按钮的Props|`ButtonProps`|`-`|
|content-class|弹出框内容的类名|`ClassName`|`-`|
|content-style|弹出框内容的样式|`CSSProperties`|`-`|
|arrow-class|弹出框箭头的类名|`ClassName`|`-`|
|arrow-style|弹出框箭头的样式|`CSSProperties`|`-`|
|popup-container|弹出框的挂载点|`string \| HTMLElement`|`-`|
|on-before-ok|触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。|`(  done: (closed: boolean) => void) => void \| boolean \| Promise<void \| boolean>`|`-`|
|on-before-cancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`() => boolean`|`-`|
### `<popconfirm>` Events

|事件名|描述|参数|
|---|---|---|
|popup-visible-change|气泡确认框的显隐状态改变时触发|visible: `boolean`|
|ok|点击确认按钮时触发|-|
|cancel|点击取消按钮时触发|-|
### `<popconfirm>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|
|content|内容|-|


