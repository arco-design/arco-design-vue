```yaml
meta:
  type: Component
  category: Data Entry
title: Mention
description: Used to mention someone or something in the input, often used for posting, chatting or commenting.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/prefix.md

## API


### `<mention>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`string`|`-`||
|default-value|Default value (uncontrolled state)|`string`|`''`||
|data|Data for automatic completion|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|prefix|Keywords that trigger auto-completion|`string \| string[]`|`'@'`||
|split|Before and after the selected item separator|`string`|`' '`||
|type|default input or textarea|`'input' \| 'textarea'`|`'input'`||
|disabled|Whether to disable|`boolean`|`false`||
|allow-clear|Whether to allow the input to be cleared|`boolean`|`false`|2.23.0|
### `<mention>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|change|Triggered when the value changes|value: `string`||
|search|Trigger on dynamic search prefix|value: `string`||
|select|Triggered when the drop-down option is selected|value: `string`||
|clear|Triggered when the user clicks the clear button|-|2.23.0|
### `<mention>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|option|Display content of options|data: `OptionInfo`|2.13.0|


