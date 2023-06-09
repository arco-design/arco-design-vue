```yaml
meta:
  type: 组件
  category: 数据输入
title: 提及 Mention
description: 用于在输入中提及某人或某事，常用于发布、聊天或评论功能。
```

@import ./__demo__/basic.md

@import ./__demo__/prefix.md

## API


### `<mention>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控状态）|`string`|`''`||
|data|用于自动补全的数据|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|prefix|触发自动补全的关键字|`string \| string[]`|`'@'`||
|split|选中项的前后分隔符|`string`|`' '`||
|type|输入框或文本域|`'input' \| 'textarea'`|`'input'`||
|disabled|是否禁用|`boolean`|`false`||
|allow-clear|是否允许清空输入框|`boolean`|`false`|2.23.0|
### `<mention>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|值发生改变时触发|value: `string`||
|search|动态搜索时触发，2.47.0 版本增加 prefix 参数|value: `string`<br>prefix: `string`||
|select|选择下拉选项时触发|value: `string \| number \| Record<string, any> \| undefined`||
|clear|用户点击清除按钮时触发|-|2.23.0|
|focus|文本框获取焦点时触发|ev: `FocusEvent`|2.42.0|
|blur|文本框失去焦点时触发|ev: `FocusEvent`|2.42.0|
### `<mention>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|focus|使输入框获取焦点|-|-|2.24.0|
|blur|使输入框失去焦点|-|-|2.24.0|
### `<mention>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|option|选项内容|data: `OptionInfo`|2.13.0|


