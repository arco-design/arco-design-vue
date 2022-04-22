
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

@import ./__demo__/footer.md

@import ./__demo__/border.md

@import ./__demo__/create.md

@import ./__demo__/search.md

@import ./__demo__/scroll.md

@import ./__demo__/fallback.md

@import ./__demo__/remote.md

@import ./__demo__/group.md

@import ./__demo__/label.md

@import ./__demo__/linkage.md

@import ./__demo__/field-names.md

@import ./__demo__/virtual-list.md

## API


### `<select>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|multiple|Whether to open multi-select mode (The search is turned on by default in the multi-select mode)|`boolean`|`false`||
|model-value **(v-model)**|Value|`string\| number\| Record<string, unknown>\| (string \| number \| Record<string, unknown>)[]`|`-`||
|default-value|Default value (uncontrolled mode)|`string\| number\| Record<string, unknown>\| (string \| number \| Record<string, unknown>)[]`|`'' \| []`||
|input-value **(v-model)**|The value of the input|`string`|`-`||
|default-input-value|The default value of the input (uncontrolled mode)|`string`|`''`||
|size|The size of the select|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|placeholder|Placeholder|`string`|`-`||
|loading|Whether it is loading state|`boolean`|`false`||
|disabled|Whether to disable|`boolean`|`false`||
|error|Whether it is an error state|`boolean`|`false`||
|allow-clear|Whether to allow clear|`boolean`|`false`||
|allow-search|Whether to allow searching|`boolean \| { retainInputValue?: boolean }`|`false (single) \| true (multiple)`||
|allow-create|Whether to allow creation|`boolean`|`false`||
|max-tag-count|In multi-select mode, the maximum number of labels displayed. 0 means unlimited|`number`|`0`||
|popup-container|Mount container for popup|`string \| HTMLElement`|`-`||
|bordered|Whether to display the border of the input box|`boolean`|`true`||
|popup-visible **(v-model)**|Whether to show the dropdown|`boolean`|`-`||
|default-popup-visible|Whether the popup is visible by default (uncontrolled mode)|`boolean`|`false`||
|unmount-on-close|Whether to destroy the element when the dropdown is closed|`boolean`|`false`||
|filter-option|Whether to filter options|`boolean \| ((inputValue: string, option: SelectOptionData) => boolean)`|`true`||
|options|Option data|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`||
|trigger-props|Trigger props of the drop-down menu|`TriggerProps`|`-`||
|format-label|Format display content|`(data: SelectOptionData) => string`|`-`||
|fallback-option|Options that do not exist in custom values|`boolean\| ((    value: string \| number \| Record<string, unknown>  ) => SelectOptionData)`|`true`|2.10.0|
|show-extra-options|Options that do not exist in custom values|`boolean`|`true`|2.10.0|
|value-key|Used to determine the option key value attribute name|`string`|`'value'`|2.18.0|
|search-delay|Delay time to trigger search event|`number`|`500`|2.18.0|
|limit|Maximum number of choices in multiple choice|`number`|`0`|2.18.0|
|field-names|Customize fields in `SelectOptionData`|`SelectFieldNames`|`-`|2.22.0|
### `<select>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|change|Triggered when the value changes|-||
|input-value-change|Triggered when the value of the input changes|-||
|popup-visible-change|Triggered when the display state of the drop-down box changes|-||
|clear|Triggered when the clear button is clicked|popupVisible: `boolean`||
|remove|Triggered when the delete button of the label is clicked|-||
|search|Triggered when the user searches|-||
|dropdown-scroll|Triggered when the drop-down scrolls|-||
|dropdown-reach-bottom|Triggered when the drop-down menu is scrolled to the bottom|-||
|exceed-limit|Triggered when multiple selection exceeds the limit|value: `mixed`|2.18.0|
### `<select>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|trigger|Custom trigger element|-|2.22.0|
|prefix|Prefix|-|2.22.0|
|search-icon|Search icon for select box|-|2.16.0|
|loading-icon|Loading icon for select box|-|2.16.0|
|arrow-icon|Arrow icon for select box|-|2.16.0|
|footer|The footer of the drop-down box|-||
|label|Display content of label|data: `SelectOptionData`||
|option|Display content of options|data: `SelectOptionData`||
|empty|Display content when the option is empty|-||




### `<option>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|value|Option value (if not filled, it will be obtained from the content)|`string\|number\|object`|`-`||
|label|Option label (if not filled, it will be obtained from the content)|`string`|`-`||
|disabled|Whether to disable|`boolean`|`false`||
|tag-props|Displayed tag attributes|`TagProps`|`-`|2.8.0|
|extra|Extra data|`object`|`-`|2.10.0|
|index|index for manually specifying option|`number`|`-`|2.20.0|




### `<optgroup>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|label|Title of option group|`string`|`-`|
### `<optgroup>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|label|Title of option group|-|2.10.0|



```ts
/**
 * @zh 选项
 * @en Option
 */
type Option = string | number | SelectOptionData | SelectOptionGroup;

/**
 * @zh 筛选
 * @en Filter
 */
type FilterOption = boolean | ((inputValue: string, option: SelectOptionData) => boolean);
```


### SelectOptionData

|Name|Description|Type|Default|
|---|---|---|:---:|
|value|Option Value|`string \| number \| Record<string, unknown>`|`-`|
|label|Option content|`string`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|tagProps|Props of the multi-select label corresponding to the option|`any`|`-`|
|render|Custom Render|`RenderFunction`|`-`|



### SelectOptionGroup

|Name|Description|Type|Default|
|---|---|---|:---:|
|isGroup|Whether it is an option group|`true`|`-`|
|label|Option group title|`string`|`-`|
|options|Options in the option group|`SelectOption[]`|`-`|


