
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

@import ./__demo__/header.md

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
|model-value **(v-model)**|Value|`string\| number\| Record<string, any>\| (string \| number \| Record<string, any>)[]`|`-`||
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
|default-active-first-option|Whether to select the first option by default when there is no value|`boolean`|`true`|2.43.0|
|popup-visible **(v-model)**|Whether to show the dropdown|`boolean`|`-`||
|default-popup-visible|Whether the popup is visible by default (uncontrolled mode)|`boolean`|`false`||
|unmount-on-close|Whether to destroy the element when the dropdown is closed|`boolean`|`false`||
|filter-option|Whether to filter options|`boolean \| ((inputValue: string, option: SelectOptionData) => boolean)`|`true`||
|options|Option data|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|trigger-props|Trigger props of the drop-down menu|`TriggerProps`|`-`||
|format-label|Format display content|`(data: SelectOptionData) => string`|`-`||
|fallback-option|Options that do not exist in custom values|`boolean\| ((    value: string \| number \| Record<string, unknown>  ) => SelectOptionData)`|`true`|2.10.0|
|show-extra-options|Options that do not exist in custom values|`boolean`|`true`|2.10.0|
|value-key|Used to determine the option key value attribute name|`string`|`'value'`|2.18.0|
|search-delay|Delay time to trigger search event|`number`|`500`|2.18.0|
|limit|Maximum number of choices in multiple choice|`number`|`0`|2.18.0|
|field-names|Customize fields in `SelectOptionData`|`SelectFieldNames`|`-`|2.22.0|
|scrollbar|Whether to enable virtual scroll bar|`boolean \| ScrollbarProps`|`true`|2.38.0|
|show-header-on-empty|Whether to display the header in the empty state|`boolean`|`false`||
|show-footer-on-empty|Whether to display the footer in the empty state|`boolean`|`false`||
### `<select>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|change|Triggered when the value changes|value: ` string \| number \| Record<string, any> \| (string \| number \| Record<string, any>)[] `||
|input-value-change|Triggered when the value of the input changes|inputValue: `string`||
|popup-visible-change|Triggered when the display state of the drop-down box changes|visible: `boolean`||
|clear|Triggered when the clear button is clicked|-||
|remove|Triggered when the delete button of the label is clicked|removed: `string \| number \| Record<string, any> \| undefined`||
|search|Triggered when the user searches|inputValue: `string`||
|dropdown-scroll|Triggered when the drop-down scrolls|-||
|dropdown-reach-bottom|Triggered when the drop-down menu is scrolled to the bottom|-||
|exceed-limit|Triggered when multiple selection exceeds the limit|value: `string \| number \| Record<string, any> \| undefined`<br>ev: `Event`|2.18.0|
### `<select>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|trigger|Custom trigger element|-|2.22.0|
|prefix|Prefix|-|2.22.0|
|search-icon|Search icon for select box|-|2.16.0|
|loading-icon|Loading icon for select box|-|2.16.0|
|arrow-icon|Arrow icon for select box|-|2.16.0|
|footer|The footer of the drop-down box|-||
|header|The header of the drop-down box|-|2.43.0|
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



### Type

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




### VirtualListProps

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|height|Viewable area height|`number \| string`|`-`||
|threshold|The threshold of the number of elements to enable virtual scrolling. When the number of data is less than the threshold, virtual scrolling will not be enabled.|`number`|`-`||
|isStaticItemHeight|(Repealed) Is the element height fixed. Version 2.18.0 deprecated, please use `fixedSize`|`boolean`|`false`||
|fixedSize|Is the element height fixed.|`boolean`|`false`|2.34.1|
|estimatedSize|Is the element height fixed.|`number`|`-`|2.34.1|
|buffer|The number of elements mounted in advance outside the boundary of the viewport.|`number`|`10`|2.34.1|




## FAQ

### Use `Object` format as option value
When using the `Object` format as the value of the option, you need to specify the field name to obtain the unique identifier for the selector through the `value-key` attribute, and the default value is `value`.

For example, when I need to specify `key` as a unique identifier:
```vue
<template>
  <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..." value-key="key">
    <a-option v-for="item of data" :value="item" :label="item.label" />
  </a-select>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      key: 'extra1'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      key: 'extra2'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      key: 'extra3'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      key: 'extra4'
    }]

    return {
      value,
      data
    }
  },
}
</script>
```
