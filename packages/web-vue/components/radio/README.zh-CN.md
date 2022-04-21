```yaml
meta:
  type: 组件
  category: 数据输入
title: 单选框 Radio
description: 在一组相关且互斥数据中，用户仅能选择一个选项。
```

@import ./__demo__/basic.md

@import ./__demo__/group.md

@import ./__demo__/direction.md

@import ./__demo__/button.md

@import ./__demo__/size.md

## API


### `<radio>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string \| number \| boolean`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string \| number \| boolean`|`true`|
|type|单选的类型|`'radio' \| 'button'`|`'radio'`|
|disabled|是否禁用|`boolean`|`false`|
### `<radio>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `string, number, boolean`|
### `<radio>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|radio|自定义单选框|-|2.18.0|




### `<radio-group>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`string \| number \| boolean`|`-`|
|default-value|默认值（非受控状态）|`string \| number \| boolean`|`''`|
|type|单选框组的类型|`'radio' \| 'button'`|`'radio'`|
|size|单选框组的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`|
|direction|单选框组的方向|`'horizontal' \| 'vertical'`|`'horizontal'`|
|disabled|是否禁用|`boolean`|`false`|
### `<radio-group>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `(string \| number)`|


