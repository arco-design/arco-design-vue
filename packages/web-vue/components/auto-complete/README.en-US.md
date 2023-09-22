```yaml
meta:
  type: Component
  category: Data Entry
title: AutoComplete
description: The auto-complete function of the input.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/strict.md

@import ./__demo__/footer.md

## API


### `<auto-complete>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`string`|`-`||
|default-value|Default value (uncontrolled mode)|`string`|`''`||
|disabled|Whether to disable|`boolean`|`false`||
|data|Data used for auto-complete|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|popup-container|Mount container for popup|`string \| HTMLElement \| null \| undefined`|`-`||
|strict|Whether it is strict verification mode|`boolean`|`false`||
|filter-option|Custom option filtering method|`FilterOption`|`true`||
|trigger-props|trigger props|`TriggerProps`|`-`|2.14.0|
|allow-clear|Whether to allow the input to be cleared|`boolean`|`false`|2.23.0|
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`|2.50.0|
### `<auto-complete>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|change|Emitted when the value changes|value: `string`||
|search|Emitted when the user searches|value: `string`||
|select|Emitted when an option is selected|value: `string`||
|clear|Triggered when the user clicks the clear button|ev: `Event`|2.23.0|
|dropdown-scroll|Triggered when the drop-down scrolls|ev: `Event`|2.52.0|
|dropdown-reach-bottom|Triggered when the drop-down menu is scrolled to the bottom|ev: `Event`|2.52.0|
### `<auto-complete>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|focus|Make the input box focus|-|-|2.40.0|
|blur|Make the input box lose focus|-|-|2.40.0|
### `<auto-complete>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|option|Display content of options|data: `OptionInfo`|2.13.0|
|footer|The footer of the popup menu box|-||


