```yaml
meta:
  type: 组件
  category: 数据输入
title: 表单 Form
description: 具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
```

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

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model **(必填)**|表单数据对象|`object`|`-`||
|layout|表单的布局方式，包括水平、垂直、多列|`'horizontal' \| 'vertical' \| 'inline'`|`'horizontal'`||
|size|表单控件的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|label-col-props|标签元素布局选项。参数同 `<col>` 组件一致|`object`|` span: 5, offset: 0 `||
|wrapper-col-props|表单控件布局选项。参数同 `<col>` 组件一致|`object`|` span: 19, offset: 0 `||
|label-align|标签的对齐方向|`'left' \| 'right'`|`'right'`||
|disabled|是否禁用表单|`boolean`|`-`||
|rules|表单项校验规则|`Record<string, FieldRule \| FieldRule[]>`|`-`||
|auto-label-width|是否开启自动标签宽度，仅在 `layout="horizontal"` 下生效。|`boolean`|`false`|2.13.0|
|id|表单 `id` 属性和表单控件 `id` 前缀|`string`|`-`||
|scroll-to-first-error|验证失败后滚动到第一个错误字段|`boolean`|`false`|2.51.0|
### `<form>` Events

|事件名|描述|参数|
|---|---|---|
|submit|表单提交时触发|data: `{values: Record<string, any>; errors: Record<string, ValidatedError> \| undefined}`<br>ev: `Event`|
|submit-success|验证成功时触发|values: `Record<string, any>`<br>ev: `Event`|
|submit-failed|验证失败时触发|data: `{values: Record<string, any>; errors: Record<string, ValidatedError>}`<br>ev: `Event`|
### `<form>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|validate|校验全部表单数据|callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise<undefined \| Record<string, ValidatedError>>||
|validateField|校验部分表单数据|field: `string \| string[]`<br>callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise<undefined \| Record<string, ValidatedError>>||
|resetFields|重置表单数据|field: `string \| string[]`|-||
|clearValidate|清除校验状态|field: `string \| string[]`|-||
|setFields|设置表单项的值和状态|data: `Record<string, FieldData>`|-||
|scrollToField|滚动到指定表单项|field: `string`|-|2.51.0|




### `<form-item>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|field|表单元素在数据对象中的path（数据项必填）|`string`|`''`||
|label|标签的文本|`string`|`-`||
|tooltip|提示内容|`string`|`-`|2.41.0|
|show-colon|是否显示冒号|`boolean`|`false`||
|no-style|是否去除样式|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`-`||
|help|帮助文案|`string`|`-`||
|extra|额外显示的文案|`string`|`-`||
|required|是否必须填写|`boolean`|`false`||
|asterisk-position|可选择将星号置于 label 前/后|`'start' \| 'end'`|`'start'`|2.41.0|
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
|content-flex|内容层是否开启 flex 布局|`boolean`|`true`|2.13.0|
|merge-props|（已废除）控制传递到子元素上的 Props。默认包括 disabled、error、size、 events 和 FormItem 上的额外属性。2.18.0 版本废除|`boolean \| ((props: Record<string, any>) => Record<string, any>)`|`true`|2.13.0|
|label-col-flex|设置标签 `Col` 组件的 flex 属性。设置时表单 `Col` 组件的 flex 属性会被设置为 `auto`。|`number\|string`|`-`|2.13.0|
|feedback|是否显示表单控件的反馈图标|`boolean`|`false`|2.16.0|
|label-component|表单项标签渲染的元素|`string`|`'label'`|2.22.0|
|label-attrs|表单项元素的属性|`object`|`-`|2.22.0|
### `<form-item>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|label|标签|-|
|help|帮助信息|-|
|extra|额外内容|-|



## Type


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

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|label|标签的文本|`string`|`-`|2.18.0|
|field|字段名|`string`|`-`||
|value|字段值|`any`|`-`||
|type|字段类型|`string`|`-`||
|isRequiredError|是否为 `required` 错误|`boolean`|`false`||
|message|错误信息|`string`|`-`||



### FormItemEventHandler

|参数名|描述|类型|默认值|
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

### 关于 `form-item` 的 `field` 属性
`field` 属性的值为获取当前 `form-item` 对应值的路径字符串。

例如传入 model 属性的数据结构为：
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
```
此时，如果想要指定当前 `form-item` 对应的值为 `id: '2222'`，需要设置 `field="people.2.id"`，值中的分隔符需要使用 `.`。数组分割也可以使用 `[]`，例如 `field="people[2].id"`

### 关于在 label 插槽中使用可点击元素

表单组件的标题区域默认使用 `label` 元素包裹，会在点击时激活输入组件，如果在其中放入可以点击组件，会影响其正常功能。
此时可以使用 `label-component` 属性修改包裹元素为 `span` 解决这个问题。

