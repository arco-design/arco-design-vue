```yaml
meta:
  type: 组件
  category: 通用
title: 按钮 Button
description: 按钮是一种命令组件，可发起一个即时操作。
```

@import ./__demo__/basic.md

@import ./__demo__/icon.md

@import ./__demo__/shape.md

@import ./__demo__/size.md

@import ./__demo__/status.md

@import ./__demo__/disabled.md

@import ./__demo__/loading.md

@import ./__demo__/long.md

@import ./__demo__/group.md

## API


### `<button>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。|`ButtonTypes`|`'secondary'`|
|shape|按钮的形状|`BorderShape`|`-`|
|status|按钮的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`'normal'`|
|size|按钮的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|long|按钮的宽度是否随容器自适应。|`boolean`|`false`|
|loading|按钮是否为加载中状态|`boolean`|`false`|
|disabled|按钮是否禁用|`boolean`|`false`|
|html-type|设置 `button` 的原生 `type` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")|`string`|`'button'`|
|autofocus|设置 `button` 的原生 `autofocus` 属性，可选值参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type "_blank")|`boolean`|`false`|
|href|设置跳转链接。设置此属性时，按钮渲染为a标签。|`string`|`-`|
### `<button>` Events

|事件名|描述|参数|
|---|---|---|
|click|点击按钮时触发|ev: `MouseEvent`|
### `<button>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|icon|图标|-|




### `<button-group>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|按钮的类型，分为五种：次要按钮、主要按钮、虚框按钮、线性按钮、文字按钮。|`ButtonTypes`|`-`|
|status|按钮的状态|`'normal' \| 'warning' \| 'success' \| 'danger'`|`-`|
|shape|按钮的形状|`BorderShape`|`-`|
|size|按钮的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`|
|disabled|全部子按钮是否禁用|`boolean`|`false`|


