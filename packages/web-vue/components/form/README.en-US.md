```yaml
meta:
  type: Component
  category: Data Entry
title: Form
description: A form with data collection, verification and submission functions, including checkboxes, radio buttons, input boxes, drop-down selection boxes and other elements.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/layout.md

@import ./__demo__/extra.md

@import ./__demo__/nest.md

@import ./__demo__/grid.md

@import ./__demo__/auto-width.md

@import ./__demo__/validation.md

@import ./__demo__/validation2.md

@import ./__demo__/status.md

@import ./__demo__/dynamic.md

@import ./__demo__/disabled.md

@import ./__demo__/async.md

@import ./__demo__/custom.md

@import ./__demo__/scroll.md

## API


### `<form>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model **(required)**|Form data object|`object`|`-`||
|layout|The layout of the form, including horizontal, vertical, and multi-column|`'horizontal' \| 'vertical' \| 'inline'`|`'horizontal'`||
|size|The size of the form|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|label-col-props|Label element layout options. The parameters are the same as the `<col>` component|`object`|` span: 5, offset: 0 `||
|wrapper-col-props|Form control layout options. The parameters are the same as the `<col>` component|`object`|` span: 19, offset: 0 `||
|label-align|Alignment direction of the label|`'left' \| 'right'`|`'right'`||
|disabled|Whether to disable the form|`boolean`|`-`||
|rules|Form item validation rules|`Record<string, FieldRule \| FieldRule[]>`|`-`||
|auto-label-width|Whether to enable automatic label width, it only takes effect under `layout="horizontal"`.|`boolean`|`false`|2.13.0|
|id|Form `id` attribute and form control `id` prefix|`string`|`-`||
|scroll-to-first-error|Scroll to the first error field after verification fails|`boolean`|`false`|2.51.0|
### `<form>` Events

|Event Name|Description|Parameters|
|---|---|---|
|submit|Triggered when the form is submitted|data: `{values: Record<string, any>; errors: Record<string, ValidatedError> \| undefined}`<br>ev: `Event`|
|submit-success|Triggered when verification is successful|values: `Record<string, any>`<br>ev: `Event`|
|submit-failed|Triggered when verification failed|data: `{values: Record<string, any>; errors: Record<string, ValidatedError>}`<br>ev: `Event`|
### `<form>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|validate|Verify all form data|callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise<undefined \| Record<string, ValidatedError>>||
|validateField|Validate part of the form data|field: `string \| string[]`<br>callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise<undefined \| Record<string, ValidatedError>>||
|resetFields|Reset form data|field: `string \| string[]`|-||
|clearValidate|Clear verification status|field: `string \| string[]`|-||
|setFields|Set the value and status of the form item|data: `Record<string, FieldData>`|-||
|scrollToField|Scroll to the specified form item|field: `string`|-|2.51.0|




### `<form-item>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|field|The path of the form element in the data object (required for the data item)|`string`|`''`||
|label|Label text|`string`|`-`||
|tooltip|Tooltip text|`string`|`-`|2.41.0|
|show-colon|Whether to show a colon|`boolean`|`false`||
|no-style|Whether to remove the style|`boolean`|`false`||
|disabled|Whether to disable|`boolean`|`-`||
|help|Help copywriting|`string`|`-`||
|extra|Additional display copy|`string`|`-`||
|required|Is it required|`boolean`|`false`||
|asterisk-position|Optionally place an asterisk before/after the label|`'start' \| 'end'`|`'start'`|2.41.0|
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
|content-flex|Whether to enable flex layout in the content layer|`boolean`|`true`|2.13.0|
|merge-props|(Repealed) Control the Props passed to the child element. The default includes disabled, error, size, events and additional attributes on FormItem. Version 2.18.0 deprecated|`boolean \| ((props: Record<string, any>) => Record<string, any>)`|`true`|2.13.0|
|label-col-flex|Set the flex property of the label `Col` component. When set, the flex property of the form `Col` component will be set to `auto`.|`number\|string`|`-`|2.13.0|
|feedback|Whether to show the feedback icon for the form control|`boolean`|`false`|2.16.0|
|label-component|The element that the form item label renders|`string`|`'label'`|2.22.0|
|label-attrs|Attributes of the form item element|`object`|`-`|2.22.0|
### `<form-item>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|label|Label|-|
|help|Help message|-|
|extra|Extra content|-|



## Type


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

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|label|Label text|`string`|`-`|2.18.0|
|field|Field name|`string`|`-`||
|value|Field value|`any`|`-`||
|type|Field Type|`string`|`-`||
|isRequiredError|Is it a `required` error|`boolean`|`false`||
|message|Error message|`string`|`-`||



### FormItemEventHandler

|Name|Description|Type|Default|
|---|---|---|:---:|
|onChange|onChange|`(ev?: Event) => void`|`-`|
|onInput|onInput|`(ev?: Event) => void`|`-`|
|onFocus|onFocus|`(ev?: Event) => void`|`-`|
|onBlur|onBlur|`(ev?: Event) => void`|`-`|



### useFormItem

```ts
const useFormItem = (data: {
  size?: Ref<Size | undefined>;
  disabled?: Ref<boolean>;
  error?: Ref<boolean>;
}) => {
  mergedSize:Ref<Size>;
  mergedDisabled:Ref<boolean>;
  mergedError:Ref<boolean>;
  feedback:Ref<string>;
  eventHandlers:Ref<FormItemEventHandler>;
}
```


## FAQ

### About the `field` attribute of `form-item`
The value of the `field` attribute is the path string to get the corresponding value of the current `form-item`. Array division can also use `[]`, for example `field="people[2].id"`

For example, the data structure passed into the model property is:
```ts
const data = reactive({
   name:'xiaoming',
   people:[
     {
       id:'1111'
     },
     {
       // bind this value
       id:'2222'
     }
   ]
})
````
At this point, if you want to specify the value corresponding to the current `form-item` as `id: '2222'`, you need to set `field="people.2.id"`, and the separator in the value needs to use `.`

### About using clickable elements in the label slot

The title area of the form component is wrapped with the `label` element by default, which will activate the input component when clicked. If you put a clickable component in it, it will affect its normal function.
At this point, you can use the `label-component` attribute to modify the wrapping element to `span` to solve this problem.
