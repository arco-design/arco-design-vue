
```yaml
meta:
  type: Component
  category: Data Entry
title: Transfer
description: A two-column multi-select component that moves elements from one column to another in real time.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/search.md

@import ./__demo__/one-way.md

@import ./__demo__/custom.md

@import ./__demo__/simple.md

@import ./__demo__/tree.md

@import ./__demo__/custom-header.md

## API


### `<transfer>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|data|Data of the transfer|`TransferItem[]`|`[]`||
|model-value **(v-model)**|Value in the target selection box|`string[]`|`-`||
|default-value|The default value in the target selection box (uncontrolled state)|`string[]`|`[]`||
|selected **(v-model)**|Selected option value|`string[]`|`-`||
|default-selected|The option value selected by default (uncontrolled state)|`string[]`|`[]`||
|disabled|Whether to disable|`boolean`|`false`||
|simple|Whether to open the simple mode (click the option to move)|`boolean`|`false`||
|one-way|Whether to open the one-way mode (only move to the target selection box)|`boolean`|`false`||
|show-search|Whether to show the search input|`boolean`|`false`||
|show-select-all|Whether show select all checkbox on the header|`boolean`|`true`|2.39.0|
|title|The title of the source and target selection boxes|`string[]`|`['Source', 'Target']`||
|source-input-search-props|Search box configuration for source selection box|`object`|`-`|2.51.1|
|target-input-search-props|Search box configuration for target selection box|`object`|`-`|2.51.1|
### `<transfer>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value of the target selection box changes|value: `string[]`|
|select|Triggered when the selected value changes|selected: `string[]`|
|search|Triggered when the user searches|value: `string`<br>type: `'target'\|'source'`|
### `<transfer>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|source|Source content|data: `TransferItem[]`<br>selectedKeys: `string[]`<br>onSelect: `(value: string[]) => void`|2.39.0|
|source-title|Source Header|countTotal: `number`<br>countSelected: `number`<br>searchValue: `string`<br>checked: `boolean`<br>indeterminate: `boolean`<br>onSelectAllChange: `(checked:boolean) => void`<br>onClear: `() => void`|2.45.0|
|to-target-icon|To target icon slot|-|2.52.0|
|to-source-icon|To source icon slot|-|2.52.0|
|target|Target content|data: `TransferItem[]`<br>selectedKeys: `string[]`<br>onSelect: `(value: string[]) => void`|2.39.0|
|target-title|Target Header|countTotal: `number`<br>countSelected: `number`<br>searchValue: `string`<br>checked: `boolean`<br>indeterminate: `boolean`<br>onSelectAllChange: `(checked:boolean) => void`<br>onClear: `() => void`|2.45.0|
|item|Option|value: `string`<br>label: `string`||




### TransferItem

|Name|Description|Type|Default|
|---|---|---|:---:|
|value|Option value|`string`|`-`|
|label|Option label|`string`|`-`|
|disabled|Whether to disable|`boolean`|`false`|


