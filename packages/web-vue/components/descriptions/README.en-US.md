```yaml
meta:
  type: Component
  category: Data Display
title: Descriptions
description: Generally used for the information display of the detail page.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/single.md

@import ./__demo__/align.md

@import ./__demo__/bordered.md

@import ./__demo__/layout.md

@import ./__demo__/example.md

## API


### `<descriptions>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|data|Data for descriptions|`DescData[]`|`[]`||
|column|The number of data placed in each row. Version 2.20.0 supports reactive configuration, the configuration can refer to Grid|`number \| ResponsiveValue`|`3`||
|title|Title of descriptions|`string`|`-`||
|layout|Arrangement of descriptions|`'horizontal' \| 'vertical' \| 'inline-horizontal' \| 'inline-vertical'`|`'horizontal'`||
|align|Alignment position of text|`TextAlign \| { label?: TextAlign; value?: TextAlign }`|`'left'`||
|size|The size of the descriptions|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`||
|bordered|Whether to show the border|`boolean`|`false`||
|label-style|Data label style|`CSSProperties`|`-`||
|value-style|Data content style|`CSSProperties`|`-`||
|table-layout|The `layout-fixed` of the table style in the description. The width will be evenly distributed when it's set to `fixed`.|`'auto' \| 'fixed'`|`'auto'`|2.38.0|
### `<descriptions>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|value|Data value|value: `string`<br>index: `number`<br>data: `DescData`|
|label|Data label|label: `string`<br>index: `number`<br>data: `DescData`|
|title|Title|-|




### `<descriptions-item>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|span|number of columns|`number`|`1`|2.18.0|
|label|Label|`string`|`-`|2.18.0|
### `<descriptions-item>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|label|Label|-|2.18.0|




### DescData

|Name|Description|Type|Default|
|---|---|---|:---:|
|label|Label|`string \| RenderFunction`|`-`|
|value|Data|`string \| RenderFunction`|`-`|
|span|number of columns|`number`|`1`|


