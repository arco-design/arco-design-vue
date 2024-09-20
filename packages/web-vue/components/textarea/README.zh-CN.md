```yaml
meta:
  type: 组件
  category: 数据输入
title: 文本域 Textarea
description: 多行纯文本编辑控件，适用于评论或反馈表单中的一段意见。
```

@import ./__demo__/basic.md

@import ./__demo__/status.md

@import ./__demo__/word-limit.md

@import ./__demo__/auto-size.md

## API


### `<textarea>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控状态）|`string`|`''`||
|placeholder|提示文字|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|max-length|输入值的最大长度，errorOnly 属性在 2.12.0 版本添加|`number \| { length: number; errorOnly?: boolean }`|`0`||
|show-word-limit|是否显示字数统计|`boolean`|`false`||
|allow-clear|是否允许清空文本域|`boolean`|`false`||
|auto-size|是否让文本框自适应内容高度|`boolean \| { minRows?: number; maxRows?: number }`|`false`||
|word-length|字符长度的计算方法|`(value: string) => number`|`-`||
|word-slice|字符截取方法，同 wordLength 一起使用|`(value: string, maxLength: number) => string`|`-`|2.12.0|
|textarea-attrs|透传给 textarea 的属性|`Record<string, any>`|`-`||
### `<textarea>` Events

|事件名|描述|参数|
|---|---|---|
|input|用户输入时触发|value: `string`<br>ev: `Event`|
|change|仅在文本框失焦时触发|value: `string`<br>ev: `Event`|
|clear|点击清除按钮时触发|ev: `MouseEvent`|
|focus|文本框获取焦点时触发|ev: `FocusEvent`|
|blur|文本框失去焦点时触发|ev: `FocusEvent`|
### `<textarea>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|focus|使输入框获取焦点|-|-|2.24.0|
|blur|使输入框失去焦点|-|-|2.24.0|


