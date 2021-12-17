```yaml
meta:
  type: 组件
  category: 数据输入
title: 表单 Form
description: 具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
```

@import ./__demo__/basic.md

@import ./__demo__/nest.md

@import ./__demo__/layout.md

@import ./__demo__/validation.md

@import ./__demo__/dynamic.md

@import ./__demo__/disabled.md

@import ./__demo__/async.md



### `<form>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model **(必填)**|表单数据对象|`object`|`-`|
|layout|表单的布局方式，包括水平、垂直、多列|`'horizontal' \| 'vertical' \| 'inline'`|`'horizontal'`|
|size|表单控件的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|label-col-props|标签元素布局选项。参数同 `<col>` 组件一致|`object`|` span: 5, offset: 0 `|
|wrapper-col-props|表单控件布局选项。参数同 `<col>` 组件一致|`object`|` span: 19, offset: 0 `|
|label-align|标签的对齐方向|`'left' \| 'right'`|`'right'`|
|disabled|是否禁用表单|`boolean`|`-`|
|rules|表单项校验规则|`Record<string, FieldRule \| FieldRule[]>`|`-`|
### `<form>` Events

|事件名|描述|参数|
|---|---|---|
|submit|表单提交时触发|data: `{values: any; errors: undefined \| Record<string, ValidatedError>}`<br>e: `Event`|
|submit-success|验证成功时触发|values: `any`|
|submit-failed|验证失败时触发|data: `{values: any; errors: undefined \| Record<string, ValidatedError>}`|
### `<form>` Methods

|方法名|描述|参数|返回值|
|---|---|---|---|
|validate|校验全部表单数据|callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise\<union\<undefined,Record\<string,ValidatedError\>\>\>|
|validateField|校验部分表单数据|field: `string \| string[]`<br>callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise\<union\<undefined,Record\<string,ValidatedError\>\>\>|
|resetFields|重置表单数据|-|-|
|clearValidate|清除校验状态|-|-|
|setFields|设置表单项的值和状态|data: `Record<string, FieldData>`|-|




### `<form-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|field|表单元素在数据对象中的path（数据项必填）|`string`|`''`||
|label|标签的文本|`string`|`-`||
|show-colon|是否显示冒号|`boolean`|`false`||
|no-style|是否去除样式|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`-`||
|help|帮助文案|`string`|`-`||
|extra|额外显示的文案|`string`|`-`||
|required|是否必须填写|`boolean`|`false`||
|rules|表单项校验规则（优先级高于 form 的 rules）|`FieldRule \| FieldRule[]`|`-`||
|validate-status|校验状态|`'success' \| 'warning' \| 'error' \| 'validating'`|`-`||
|validate-trigger|触发校验的事件|`'change' \| 'input' \| 'focus' \| 'blur'`|`'change'`||
|label-col-props|标签元素布局选项。参数同 `<col>` 组件一致|`object`|`-`||
|wrapper-col-props|表单控件布局选项。参数同 `<col>` 组件一致|`object`|`-`||
|hide-label|是否隐藏标签|`boolean`|`false`||
|hide-asterisk|是否隐藏星号|`boolean`|`false`||
|label-col-style|标签元素布局组件的 style|`object`|`-`|2.10.0|
|wrapper-col-style|表单控件布局组件的 style|`object`|`-`|2.10.0|
|row-props|表单项布局选项。参数同 `<row>` 组件一致|`object`|`-`|2.10.0|
|row-class|表单项布局组件的 class|`string\|array\|object`|`-`|2.10.0|
|content-class|表单控件包裹层的 class|`string\|array\|object`|`-`|2.10.0|




### FieldRule

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|校验的值的类型，默认为 `'string'`|`'string'    \| 'number'    \| 'boolean'    \| 'array'    \| 'object'    \| 'email'    \| 'url'    \| 'ip'`|`-`|
|required|是否必填|`boolean`|`false`|
|message|校验失败时展示的信息|`string`|`-`|
|length|校验长度（string, array）|`number`|`-`|
|maxLength|最大长度（string）|`number`|`-`|
|minLength|最小长度（string）|`number`|`-`|
|match|匹配校验（string）|`RegExp`|`-`|
|uppercase|大写（string）|`boolean`|`false`|
|lowercase|小写（string）|`boolean`|`false`|
|min|最小值（number）|`number`|`-`|
|max|最大值（number）|`number`|`-`|
|equal|校验数值（number）|`number`|`-`|
|positive|正数（number）|`boolean`|`false`|
|negative|负数（number）|`boolean`|`false`|
|true|是否为 `true`（boolean）|`boolean`|`false`|
|false|是否为 `false`（boolean）|`boolean`|`false`|
|includes|数组中是否包含给定值（array）|`any[]`|`-`|
|deepEqual|数组元素是否相等（array）|`any`|`-`|
|empty|是否为空（object）|`boolean`|`false`|
|hasKeys|对象是否包含给定属性（object）|`string[]`|`-`|
|validator|自定义校验规则|`(    value: FieldValue \| undefined,    callback: (error?: string) => void  ) => void`|`-`|



### FieldData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|字段的值|`any`|`-`|
|status|字段的状态|`ValidateStatus`|`-`|
|message|字段的错误信息|`string`|`-`|



### ValidatedError

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|field|字段名|`string`|`-`|
|value|字段值|`any`|`-`|
|type|字段类型|`string`|`-`|
|isRequiredError|是否为 `required` 错误|`boolean`|`false`|
|message|错误信息|`string`|`-`|


