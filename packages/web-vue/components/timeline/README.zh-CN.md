```yaml
meta:
  type: 组件
  category: 数据展示
title: 时间轴 Timeline
description: 按照时间顺序或倒序规则的展示信息内容。
```

@import ./__demo__/basic.md

@import ./__demo__/icon.md

@import ./__demo__/dot.md

@import ./__demo__/type.md

@import ./__demo__/pending.md

@import ./__demo__/mode.md

@import ./__demo__/vertical.md

@import ./__demo__/direction.md

@import ./__demo__/label.md

@import ./__demo__/custom.md

## API


### `<timeline>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|reverse|是否倒序|`boolean`|`false`|
|direction|时间轴方向|`'horizontal' \| 'vertical'`|`'vertical'`|
|mode|时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。|`'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate'`|`'left'`|
|pending|是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。|`boolean\|string`|`-`|
|label-position|设置标签文本的位置|`'relative' \| 'same'`|`'same'`|
### `<timeline>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|dot|幽灵节点|-|




### `<timeline-item>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|dot-color|节点颜色|`string`|`-`|
|dot-type|节点类型：空心圆/实心圆|`'hollow' \| 'solid'`|`'solid'`|
|line-type|时间轴类型：实线/虚线/点状线|`'solid' \| 'dashed' \| 'dotted'`|`'solid'`|
|line-color|时间轴颜色|`string`|`-`|
|label|标签文本|`string`|`-`|
|position|Item 位置|`PositionType`|`-`|
### `<timeline-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|dot|自定义节点|-||
|label|自定义标签|-|2.50.0|


