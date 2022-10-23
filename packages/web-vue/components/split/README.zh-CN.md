```yaml
meta:
  type: 组件
  category: 其他
title: 面板分割 Split
description: 将面板分割成两部分。
```

@import ./__demo__/basic.md

@import ./__demo__/nested.md

## API


### `<split>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|component|分割框的 html 标签|`string`|`'div'`|
|direction|分割的方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|size **(v-model)**|分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`-`|
|default-size|默认分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`0.5`|
|min|最小阈值，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`-`|
|max|最大阈值，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number\|string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
### `<split>` Events

|事件名|描述|参数|
|---|---|---|
|move-start|开始拖拽之前触发|-|
|moving|拖拽时触发|-|
|move-end|拖拽结束之后触发|-|
### `<split>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|first|第一个面板的内容|-|
|resize-trigger|伸缩杆的内容|-|
|resize-trigger-icon|伸缩杆的图标|-|
|second|第二个面板的内容|-|


