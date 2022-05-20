```yaml
meta:
  type: 组件
  category: 其他
title: 伸缩框 ResizeBox
description: 伸缩框组件。
```

@import ./__demo__/basic.md

@import ./__demo__/controlled.md

@import ./__demo__/layout.md

@import ./__demo__/custom-triggers.md

## API


### `<resize-box>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|width **(v-model)**|宽度|`number`|`-`|
|height **(v-model)**|高度|`number`|`-`|
|component|伸缩框的 html 标签|`string`|`'div'`|
|directions|可以进行伸缩的边，有上、下、左、右可以使用|`('left' \| 'right' \| 'top' \| 'bottom')[]`|`['right']`|
### `<resize-box>` Events

|事件名|描述|参数|
|---|---|---|
|moving-start|拖拽开始时触发|ev: `MouseEvent`|
|moving|拖拽时触发|size: `{ width: number; height: number; }`<br>ev: `MouseEvent`|
|moving-end|拖拽结束时触发|ev: `MouseEvent`|
### `<resize-box>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|resize-trigger|伸缩杆的内容|direction: `'left' \| 'right' \| 'top' \| 'bottom'`|
|resize-trigger-icon|伸缩杆的图标|direction: `'left' \| 'right' \| 'top' \| 'bottom'`|


