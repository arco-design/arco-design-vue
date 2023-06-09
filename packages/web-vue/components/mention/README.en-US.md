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
|search|Trigger on dynamic search prefix, version 2.47.0 adds prefix param|value: `string`<br>prefix: `string`||
|select|Triggered when the drop-down option is selected|value: `string \| number \| Record<string, any> \| undefined`||
|clear|Triggered when the user clicks the clear button|-|2.23.0|
|focus|Emitted when the text box gets focus|ev: `FocusEvent`|2.42.0|
|blur|Emitted when the text box loses focus|ev: `FocusEvent`|2.42.0|
### `<mention>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|focus|Make the input box focus|-|-|2.24.0|
|blur|Make the input box lose focus|-|-|2.24.0|
### `<mention>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|option|Display content of options|data: `OptionInfo`|2.13.0|


