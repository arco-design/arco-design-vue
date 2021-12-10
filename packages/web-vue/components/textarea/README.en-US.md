```yaml
meta:
  type: Component
  category: Data Entry
title: Textarea
description: Multi-line plain text edit control, suitable for a paragraph of opinion in the comment or feedback form.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/status.md

@import ./__demo__/word-limit.md

@import ./__demo__/auto-size.md


### `<textarea>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`string`|`-`|
|default-value|Default value (uncontrolled state)|`string`|`''`|
|placeholder|Placeholder|`string`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|max-length|Maximum length of input value|`number`|`-`|
|show-word-limit|Whether to display word count|`boolean`|`false`|
|allow-clear|Whether to allow clearing the text|`boolean`|`false`|
|auto-size|Whether to make the textarea adapt to the height of the content|`boolean \| { minRows?: number; maxRows?: number }`|`false`|
|word-length|Calculation method of word length|`(value: string) => number`|`-`|
### `<textarea>` Events

|Event Name|Description|Parameters|
|---|---|---|
|input|Emitted when the user enters|-|
|change|Only emitted when the textarea is out of focus|-|
|clear|Emitted when the clear button is clicked|-|
|focus|Emitted when the textarea gets focus|-|
|blur|Emitted when the textarea loses focus|-|


