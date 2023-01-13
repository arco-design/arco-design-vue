```yaml
meta:
  type: 组件
  category: 数据展示
title: 徽标数 Badge
description: 一般出现在图标或文字的右上角。提供及时、重要的信息提示。
```

@import ./__demo__/basic.md

@import ./__demo__/alone.md

@import ./__demo__/dot.md

@import ./__demo__/text.md

@import ./__demo__/max.md

@import ./__demo__/status.md

@import ./__demo__/color.md

## API


### `<badge>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|自定义提示内容|`string`|`-`|
|dot|显示为小红点|`boolean`|`false`|
|dot-style|徽标的样式|`object`|`-`|
|max-count|徽标最大显示数值，如果count超过这个数值会显示为maxCount|`number`|`99`|
|offset|设置徽标位置的偏移|`number[]`|`[]`|
|color|内置的一些颜色|`ColorType \| string`|`-`|
|status|徽标的状态类型|`'normal' \| 'processing' \| 'success' \| 'warning' \| 'danger'`|`-`|
|count|徽标显示的数字|`number`|`-`|


