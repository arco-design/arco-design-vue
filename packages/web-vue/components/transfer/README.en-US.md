## zh-CN
```yaml
meta:
  type: 组件
  category: 数据输入
title: 数据穿梭框 Transfer
description: 两栏布局的多选组件，将元素从一栏即时移到另一栏。
```
---
## en-US
```yaml
meta:
  type: Component
  category: Data Entry
title: Transfer
description: A two-column multi-select component that moves elements from one column to another in real time.
```
---

@import ./__demo__/basic.md

@import ./__demo__/search.md

@import ./__demo__/one-way.md

@import ./__demo__/custom.md

@import ./__demo__/simple.md

## API


### `<transfer>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|data|Data of the transfer|`TransferItem[]`|`[]`|
|model-value **(v-model)**|Value in the target selection box|`string[]`|`-`|
|default-value|The default value in the target selection box (uncontrolled state)|`string[]`|`[]`|
|selected **(v-model)**|Selected option value|`string[]`|`-`|
|default-selected|The option value selected by default (uncontrolled state)|`string[]`|`[]`|
|disabled|Whether to disable|`boolean`|`false`|
|simple|Whether to open the simple mode (click the option to move)|`boolean`|`false`|
|one-way|Whether to open the one-way mode (only move to the target selection box)|`boolean`|`false`|
|show-search|Whether to show the search input|`boolean`|`false`|
|show-select-all|Whether show select all checkbox on the header|`boolean`|`true`|
|title|The title of the source and target selection boxes|`string[]`|`['Source', 'Target']`|
### `<transfer>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value of the target selection box changes|value: `string[]`|
|select|Triggered when the selected value changes|selected: `string[]`|
|search|Triggered when the user searches|value: `string`<br>type: `'target'\|'source'`|
### `<transfer>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|item|Option|-|




### TransferItem

|Name|Description|Type|Default|
|---|---|---|:---:|
|value|Option value|`string`|`-`|
|label|Option label|`string`|`-`|
|disabled|Whether to disable|`boolean`|`false`|


