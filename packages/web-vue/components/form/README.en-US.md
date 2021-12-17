```yaml
meta:
  type: Component
  category: Data Entry
title: Form
description: A form with data collection, verification and submission functions, including checkboxes, radio buttons, input boxes, drop-down selection boxes and other elements.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/nest.md

@import ./__demo__/layout.md

@import ./__demo__/validation.md

@import ./__demo__/dynamic.md

@import ./__demo__/disabled.md

@import ./__demo__/async.md



### `<form>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model **(required)**|Form data object|`object`|`-`|
|layout|The layout of the form, including horizontal, vertical, and multi-column|`'horizontal' \| 'vertical' \| 'inline'`|`'horizontal'`|
|size|The size of the form|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|label-col-props|Label element layout options. The parameters are the same as the `<col>` component|`object`|` span: 5, offset: 0 `|
|wrapper-col-props|Form control layout options. The parameters are the same as the `<col>` component|`object`|` span: 19, offset: 0 `|
|label-align|Alignment direction of the label|`'left' \| 'right'`|`'right'`|
|disabled|Whether to disable the form|`boolean`|`-`|
|rules|Form item validation rules|`Record<string, FieldRule \| FieldRule[]>`|`-`|
### `<form>` Events

|Event Name|Description|Parameters|
|---|---|---|
|submit|Triggered when the form is submitted|data: `{values: any; errors: undefined \| Record<string, ValidatedError>}`<br>e: `Event`|
|submit-success|Triggered when verification is successful|values: `any`|
|submit-failed|Triggered when verification failed|data: `{values: any; errors: undefined \| Record<string, ValidatedError>}`|
### `<form>` Methods

|Method|Description|Parameters|Return|
|---|---|---|:---:|
|validate|Verify all form data|callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise\<union\<undefined,Record\<string,ValidatedError\>\>\>|
|validateField|Validate part of the form data|field: `string \| string[]`<br>callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise\<union\<undefined,Record\<string,ValidatedError\>\>\>|
|resetFields|Reset form data|-|-|
|clearValidate|Clear verification status|-|-|
|setFields|Set the value and status of the form item|data: `Record<string, FieldData>`|-|




### `<form-item>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|field|The path of the form element in the data object (required for the data item)|`string`|`''`||
|label|Label text|`string`|`-`||
|show-colon|Whether to show a colon|`boolean`|`false`||
|no-style|Whether to remove the style|`boolean`|`false`||
|disabled|Whether to disable|`boolean`|`-`||
|help|Help copywriting|`string`|`-`||
|extra|Additional display copy|`string`|`-`||
|required|Is it required|`boolean`|`false`||
|rules|Form item validation rules (The priority is higher than the rules of form)|`FieldRule \| FieldRule[]`|`-`||
|validate-status|Validate status|`'success' \| 'warning' \| 'error' \| 'validating'`|`-`||
|validate-trigger|The event that triggers the verification|`'change' \| 'input' \| 'focus' \| 'blur'`|`'change'`||
|label-col-props|Label element layout options. The parameters are the same as the `<col>` component|`object`|`-`||
|wrapper-col-props|Form control layout options. The parameters are the same as the `<col>` component|`object`|`-`||
|hide-label|Whether to hide the label|`boolean`|`false`||
|hide-asterisk|Whether to hide the asterisk|`boolean`|`false`||
|label-col-style|The style of the label element layout component|`object`|`-`|2.10.0|
|wrapper-col-style|The style of the form control layout component|`object`|`-`|2.10.0|
|row-props|Form item layout options. The parameters are the same as the `<row>` component|`object`|`-`|2.10.0|
|row-class|The class of the form item layout component|`string\|array\|object`|`-`|2.10.0|
|content-class|The class of the form control wrapping layer|`string\|array\|object`|`-`|2.10.0|




### FieldRule

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|The type of the value to be checked, the default is `'string'`|`'string'    \| 'number'    \| 'boolean'    \| 'array'    \| 'object'    \| 'email'    \| 'url'    \| 'ip'`|`-`|
|required|Is it required|`boolean`|`false`|
|message|Information displayed when verification fails|`string`|`-`|
|length|Check length (string, array)|`number`|`-`|
|maxLength|Maximum length (string)|`number`|`-`|
|minLength|Minimum length (string)|`number`|`-`|
|match|Match check (string)|`RegExp`|`-`|
|uppercase|Uppercase (string)|`boolean`|`false`|
|lowercase|Lowercase (string)|`boolean`|`false`|
|min|Minimum (number)|`number`|`-`|
|max|Maximum (number)|`number`|`-`|
|equal|Check value (number)|`number`|`-`|
|positive|Positive number (number)|`boolean`|`false`|
|negative|Negative number (number)|`boolean`|`false`|
|true|Whether it is `true` (boolean)|`boolean`|`false`|
|false|Whether it is `false` (boolean)|`boolean`|`false`|
|includes|Does the array contain the given value (array)|`any[]`|`-`|
|deepEqual|Are array elements equal (array)|`any`|`-`|
|empty|Is it empty (object)|`boolean`|`false`|
|hasKeys|Does the object contain the given attribute (object)|`string[]`|`-`|
|validator|Custom verification rules|`(    value: FieldValue \| undefined,    callback: (error?: string) => void  ) => void`|`-`|



### FieldData

|Name|Description|Type|Default|
|---|---|---|:---:|
|value|Field value|`any`|`-`|
|status|Field status|`ValidateStatus`|`-`|
|message|Field error message|`string`|`-`|



### ValidatedError

|Name|Description|Type|Default|
|---|---|---|:---:|
|field|Field name|`string`|`-`|
|value|Field value|`any`|`-`|
|type|Field Type|`string`|`-`|
|isRequiredError|Is it a `required` error|`boolean`|`false`|
|message|Error message|`string`|`-`|


