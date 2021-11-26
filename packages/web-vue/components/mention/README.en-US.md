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
|type|Input box type|`'text' \| 'textarea'`|`'text'`|
|data|Data for automatic completion|`Option[]`|`[]`|
|prefix|Keywords that trigger auto-completion|`string \| string[]`|`'@'`|
|split|Before and after the selected item separator|`string`|`' '`|
|rows|Type is textarea of default rows|`string \| number`|`'2'`|

### `<mention>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value changes|value: `string`|
|select|Triggered when the drop-down option is selected|value: `string`|
