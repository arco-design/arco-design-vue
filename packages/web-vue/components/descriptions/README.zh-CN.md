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

@import ./__demo__/example.md

## API


### `<descriptions>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data|描述列表的数据|`DescData[]`|`[]`||
|column|每行放置的数据个数。2.20.0 版本支持响应式配置，配置可参考 Grid|`number \| ResponsiveValue`|`3`||
|title|描述列表的标题|`string`|`-`||
|layout|描述列表的排列方式|`'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical'`|`'horizontal'`||
|align|文字的对齐位置|`TextAlign \| { label?: TextAlign; value?: TextAlign }`|`'left'`||
|size|描述列表的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|bordered|是否显示边框|`boolean`|`false`||
|label-style|数据标签的样式|`CSSProperties`|`-`||
|value-style|数据内容的样式|`CSSProperties`|`-`||
|table-layout|描述中表格样式的 `layout-fixed`，当设置成 `fixed` 时，宽度会均分。|`'auto' \| 'fixed'`|`'auto'`|2.38.0|
### `<descriptions>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|value|数据内容|value: `string`<br>index: `number`<br>data: `DescData`|
|label|数据标签|label: `string`<br>index: `number`<br>data: `DescData`|
|title|标题|-|




### `<descriptions-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|span|所占列数|`number`|`1`|2.18.0|
|label|标签|`string`|`-`|2.18.0|
### `<descriptions-item>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|label|标签|-|2.18.0|




### DescData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|标签|`string \| RenderFunction`|`-`|
|value|数据|`string \| RenderFunction`|`-`|
|span|所占列数|`number`|`1`|


