```yaml
meta:
  type: 组件
  category: 数据输入
title: 提及 Mention
description: 用于在输入中提及某人或某事，常用于发布、聊天或评论功能。
```

@import ./__demo__/basic.md

@import ./__demo__/prefix.md


### `<mention>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string`|`-`|
|default-value|默认值（非受控状态）|`string`|`''`|
|data|用于自动补全的数据|`Option[]`|`[]`|
|prefix|触发自动补全的关键字|`string \| string[]`|`'@'`|
|split|选中项的前后分隔符|`string`|`' '`|
|type|输入框或文本域|`'input' \| 'textarea'`|`'input'`|
### `<mention>` Events

|事件名|描述|参数|
|---|---|---|
|change|值发生改变时触发|value: `string`|
|search|动态搜索时触发|value: `string`|
|select|选择下拉选项时触发|value: `string`|


