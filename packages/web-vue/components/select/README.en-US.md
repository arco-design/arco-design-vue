```yaml
meta:
  type: Component
  category: Data Entry
title: Select
description: When users need to select one or more from a group of similar data, they can use the drop-down selector, click and select the corresponding item.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/clear.md

@import ./__demo__/multiple.md

@import ./__demo__/size.md

@import ./__demo__/loading.md

@import ./__demo__/create.md

@import ./__demo__/search.md

@import ./__demo__/scroll.md

@import ./__demo__/group.md

@import ./__demo__/label.md

@import ./__demo__/linkage.md


### `<select>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|multiple|Whether to open multi-select mode|`boolean`|`false`|
|model-value **(v-model)**|Value|`string \| number \| Array<string \| number>`|`-`|
|default-value|Default value (uncontrolled mode)|`string \| number \| Array<string \| number>`|`'' | []`|
|input-value **(v-model)**|The value of the input|`string`|`-`|
|default-input-value|The default value of the input (uncontrolled mode)|`string`|`''`|
|size|The size of the select|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|placeholder|Placeholder|`string`|`-`|
|loading|Whether it is loading state|`boolean`|`false`|
|disabled|Whether to disable|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|allow-clear|Whether to allow clear|`boolean`|`false`|
|allow-search|Whether to allow searching|`boolean`|`(props: Data) => props.multiple`|
|allow-create|Whether to allow creation|`boolean`|`false`|
|max-tag-count|In multi-select mode, the maximum number of labels displayed. 0 means unlimited|`number`|`0`|
|popup-container|Mount container for popup|`string \| HTMLElement \| null \| undefined`|`-`|
|popup-visible **(v-model)**|Whether to show the dropdown|`boolean`|`-`|
|unmount-on-close|Whether to destroy the element when the dropdown is closed|`boolean`|`true`|
|filter-option|Whether to filter options|`boolean`|`true`|
|options|Option data|`Option[]`|`[]`|
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`|
|format-label|Format display content|`(data: OptionInfo) => string`|`-`|
### `<select>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value changes|-|
|input-value-change|Triggered when the value of the input changes|-|
|popup-visible-change|Triggered when the display state of the drop-down box changes|-|
|clear|Triggered when the clear button is clicked|-|
|remove|Triggered when the delete button of the label is clicked|-|
|search|Triggered when the user searches|-|
|dropdown-scroll|Triggered when the drop-down scrolls|-|
|dropdown-reach-bottom|Triggered when the drop-down menu is scrolled to the bottom|-|
### `<select>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|label|Display content of options|data: `OptionInfo`|
|empty|Display content when the option is empty|-|


