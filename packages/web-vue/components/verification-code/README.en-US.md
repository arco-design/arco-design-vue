```yaml
meta:
  type: Component
  category: Data Entry
title: VerificationCode
description: Verification code input component.
```

*Auto translate by google.*

@import ./__demo__/basic.md
@import ./__demo__/status.md
@import ./__demo__/masked.md
@import ./__demo__/separator.md
@import ./__demo__/form.md
@import ./__demo__/formatter.md

## API


### `<verification-code>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`string`|`-`|
|default-value|Default value (uncontrolled state)|`string`|`''`|
|length|The length of the verification code, rendering the corresponding number of input boxes according to the length.|`number`|`6`|
|size|Input size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|disabled|Whether to disable|`boolean`|`false`|
|masked|Password mode|`boolean`|`false`|
|readonly|Readonly|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|separator|Separator. Customizable rendering separators after input boxes with different indexes|`(index: number, character: string) => VNode`|`-`|
|formatter|Formatter function, triggered when the user input value changes|`(inputValue: string, index: number, value: string) => string \| boolean`|`-`|
### `<verification-code>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the value changes|value: ` string `|
|finish|Triggered when the filling is complete|value: ` string `|
|input|Triggered on input|inputValue: ` string `<br>index: ` number `<br>ev: `Event`|


