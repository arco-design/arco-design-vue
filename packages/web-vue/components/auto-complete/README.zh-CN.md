```yaml
meta:
  type: 组件
  category: 数据输入
title: 自动补全 AutoComplete
description: 输入框的自动补全功能。
```

@import ./__demo__/basic.md

@import ./__demo__/strict.md

## API


### `<auto-complete>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`string`|`-`||
|default-value|默认值（非受控模式）|`string`|`''`||
|disabled|是否禁用|`boolean`|`false`||
|data|用于自动提示的数据|`(string \| number \| SelectOptionData \| SelectOptionGroup)[]`|`[]`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`||
|strict|是否为严格校验模式|`boolean`|`false`||
|filter-option|自定义选项过滤方法|`FilterOption`|`true`||
|trigger-props|trigger 组件属性|`object`|`-`|2.14.0|
|allow-clear|是否允许清空输入框|`boolean`|`false`|2.23.0|
### `<auto-complete>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|change|绑定值发生改变时触发|value: `string`||
|search|用户搜索时触发|value: `string`||
|select|选择选项时触发|value: `string`||
|clear|用户点击清除按钮时触发|-|2.23.0|
### `<auto-complete>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|option|选项内容|data: `OptionInfo`|2.13.0|


