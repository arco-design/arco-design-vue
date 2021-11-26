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


### `<mention>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`string`|`-`|
|default-value|Default value (uncontrolled state)|`string`|`''`|
|data|Data for automatic completion|`Option[]`|`[]`|
|prefix|Keywords that trigger auto-completion|`string \| string[]`|`'@'`|
|split|Before and after the selected item separator|`string`|`' '`|
|type|default input or textarea|`'input' \| 'textarea'`|`'input'`|
### `<mention>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value changes|value: `string`|
|search|Trigger on dynamic search prefix|value: `string`|
|select|Triggered when the drop-down option is selected|value: `string`|


