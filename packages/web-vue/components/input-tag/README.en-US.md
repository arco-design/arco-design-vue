```yaml
meta:
  type: Component
  category: Data Entry
title: InputTag
description: Used to enter the label.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/status.md

@import ./__demo__/max.md

@import ./__demo__/size.md

## API


### `<input-tag>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`(string \| number \| TagData)[]`|`-`||
|default-value|Default value (uncontrolled state)|`(string \| number \| TagData)[]`|`[]`||
|input-value **(v-model)**|The value of the input|`string`|`-`||
|default-input-value|The default value of the input (uncontrolled state)|`string`|`''`||
|placeholder|Placeholder|`string`|`-`||
|disabled|Whether to disable|`boolean`|`false`||
|error|Whether it is an error state|`boolean`|`false`||
|readonly|Whether it is read-only mode|`boolean`|`false`||
|allow-clear|Whether to allow clear|`boolean`|`false`||
|size|The size of the input|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|max-tag-count|The maximum number of tags displayed, `0` means unlimited|`number`|`0`||
|retain-input-value|Whether to keep the content of the input box|`boolean \| { create?: boolean; blur?: boolean }`|`false`||
|format-tag|Format tag content|`(data: TagData) => string`|`-`||
|unique-value|Whether to create only unique values|`boolean`|`false`|2.15.0|
|field-names|Customize fields in `TagData`|`InputTagFieldNames`|`-`|2.22.0|
|tag-nowrap|Tag content does not wrap|`boolean`|`false`|2.56.1|
### `<input-tag>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value changes|value: `(string \| number \| TagData)[]`<br>ev: `Event`|
|input-value-change|Trigger when the input value changes|inputValue: `string`<br>ev: `Event`|
|press-enter|Triggered when the enter key is pressed|inputValue: `string`<br>ev: `KeyboardEvent`|
|remove|Triggered when the delete button of the label is clicked|removed: `string \| number`<br>ev: `Event`|
|clear|Triggered when the clear button is clicked|ev: `MouseEvent`|
|focus|Triggered when the input box gets focus|ev: `FocusEvent`|
|blur|Triggered when the input box loses focus|ev: `FocusEvent`|
### `<input-tag>` Methods

|Method|Description|Parameters|Return|
|---|---|---|:---:|
|focus|Make the input box focus|-|-|
|blur|Make the input box lose focus|-|-|
### `<input-tag>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|tag|Display content of tag|data: `TagData`|
|prefix|Prefix|-|
|suffix|Suffix|-|




### TagData

|Name|Description|Type|Default|
|---|---|---|:---:|
|value|Tag value|`string \| number`|`-`|
|label|Tag content|`string`|`-`|
|closable|Whether to close|`boolean`|`false`|
|tagProps|Tag props|`TagProps`|`-`|


