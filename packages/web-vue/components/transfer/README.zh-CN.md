```yaml
meta:
  type: 组件
  category: 数据输入
title: 数据穿梭框 Transfer
description: 两栏布局的多选组件，将元素从一栏即时移到另一栏。
```


@import ./__demo__/basic.md

@import ./__demo__/search.md

@import ./__demo__/one-way.md

@import ./__demo__/custom.md

@import ./__demo__/simple.md

@import ./__demo__/tree.md

@import ./__demo__/custom-header.md

## API


### `<transfer>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data|穿梭框的数据|`TransferItem[]`|`[]`||
|model-value **(v-model)**|目标选择框中的值|`string[]`|`-`||
|default-value|目标选择框中默认的值（非受控状态）|`string[]`|`[]`||
|selected **(v-model)**|选中的选项值|`string[]`|`-`||
|default-selected|默认选中的选项值（非受控状态）|`string[]`|`[]`||
|disabled|是否禁用|`boolean`|`false`||
|simple|是否开启简单模式（点击选项即移动）|`boolean`|`false`||
|one-way|是否开启单向模式（仅可移动到目标选择框）|`boolean`|`false`||
|show-search|是否显示搜索框|`boolean`|`false`||
|show-select-all|是否展示全选勾选框|`boolean`|`true`|2.39.0|
|title|源选择框和目标选择框的标题|`string[]`|`['Source', 'Target']`||
|source-input-search-props|源选择框的搜索框配置|`object`|`-`|2.51.1|
|target-input-search-props|目标选择框的搜索框配置|`object`|`-`|2.51.1|
### `<transfer>` Events

|事件名|描述|参数|
|---|---|---|
|change|目标选择框的值改变时触发|value: `string[]`|
|select|选中的值改变时触发|selected: `string[]`|
|search|用户搜索时触发|value: `string`<br>type: `'target'\|'source'`|
### `<transfer>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|source|源面板|data: `TransferItem[]`<br>selectedKeys: `string[]`<br>onSelect: `(value: string[]) => void`|2.39.0|
|source-title|源标题插槽|countTotal: `number`<br>countSelected: `number`<br>searchValue: `string`<br>checked: `boolean`<br>indeterminate: `boolean`<br>onSelectAllChange: `(checked:boolean) => void`<br>onClear: `() => void`|2.45.0|
|to-target-icon|移至目标图标插槽|-|2.52.0|
|to-source-icon|移至源图标插槽|-|2.52.0|
|target|目标面板|data: `TransferItem[]`<br>selectedKeys: `string[]`<br>onSelect: `(value: string[]) => void`|2.39.0|
|target-title|目标标题插槽|countTotal: `number`<br>countSelected: `number`<br>searchValue: `string`<br>checked: `boolean`<br>indeterminate: `boolean`<br>onSelectAllChange: `(checked:boolean) => void`<br>onClear: `() => void`|2.45.0|
|item|选项|value: `string`<br>label: `string`||




### TransferItem

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|选项的值|`string`|`-`|
|label|选项的标签|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|


