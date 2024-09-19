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

## API


### `<textarea>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`string`|`-`||
|default-value|Default value (uncontrolled state)|`string`|`''`||
|placeholder|Placeholder|`string`|`-`||
|disabled|Whether to disable|`boolean`|`false`||
|error|Whether it is an error state|`boolean`|`false`||
|max-length|Maximum length of input value, the errorOnly attribute was added in version 2.12.0|`number \| { length: number; errorOnly?: boolean }`|`0`||
|show-word-limit|Whether to display word count|`boolean`|`false`||
|allow-clear|Whether to allow clearing the text|`boolean`|`false`||
|auto-size|Whether to make the textarea adapt to the height of the content|`boolean \| { minRows?: number; maxRows?: number }`|`false`||
|word-length|Calculation method of word length|`(value: string) => number`|`-`||
|word-slice|Character interception method, used together with wordLength|`(value: string, maxLength: number) => string`|`-`|2.12.0|
|textarea-attrs|Attributes passed to textarea|`Record<string, any>`|`-`||
### `<textarea>` Events

|Event Name|Description|Parameters|
|---|---|---|
|input|Emitted when the user enters|value: `string`<br>ev: `Event`|
|change|Only emitted when the textarea is out of focus|value: `string`<br>ev: `Event`|
|clear|Emitted when the clear button is clicked|ev: `MouseEvent`|
|focus|Emitted when the textarea gets focus|ev: `FocusEvent`|
|blur|Emitted when the textarea loses focus|ev: `FocusEvent`|
### `<textarea>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|focus|Make the input box focus|-|-|2.24.0|
|blur|Make the input box lose focus|-|-|2.24.0|


