```yaml
meta:
  type: 组件
  category: 数据展示
title: 描述列表 Descriptions
description: 一般用于详情页的信息展示。
```

@import ./__demo__/basic.md

@import ./__demo__/single.md

@import ./__demo__/align.md

@import ./__demo__/bordered.md

@import ./__demo__/layout.md


### `<descriptions>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|data|描述列表的数据|`DescData[]`|`[]`|
|column|每行放置的数据个数|`number`|`3`|
|title|描述列表的标题|`string`|`-`|
|layout|描述列表的排列方式|`'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical'`|`'horizontal'`|
|align|文字的对齐位置|`TextAlign \| { label?: TextAlign; value?: TextAlign }`|`'left'`|
|size|描述列表的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|bordered|是否显示边框|`boolean`|`false`|
|label-style|数据标签的样式|`CSSProperties`|`-`|
|value-style|数据内容的样式|`CSSProperties`|`-`|
### `<descriptions>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|value|数据内容|value: `string`|
|label|数据标签|label: `string`|
|title|标题|-|


