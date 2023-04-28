```yaml
meta:
  type: 组件
  category: 数据输入
title: 复选框 Checkbox
description: 在一组数据中，用户可通过复选框选择一个或多个数据。
```

@import ./__demo__/basic.md

@import ./__demo__/control.md

@import ./__demo__/disabled.md

@import ./__demo__/group.md

@import ./__demo__/options.md

@import ./__demo__/limit.md

@import ./__demo__/all.md

@import ./__demo__/layout.md

@import ./__demo__/custom.md

## API


### `<checkbox>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`boolean \| Array<string \| number \| boolean>`|`-`|
|default-checked|默认是否选中（非受控状态）|`boolean`|`false`|
|value|选项的 `value`|`string\|number\|boolean`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|
### `<checkbox>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: ` boolean \| (string \| number \| boolean)[] `<br>ev: `Event`|
### `<checkbox>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|2.18.0|




### `<checkbox-group>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Array<string \| number \| boolean>`|`-`||
|default-value|默认值（非受控状态）|`Array<string \| number \| boolean>`|`[]`||
|max|支持最多选中的数量|`number`|`-`|2.36.0|
|options|选项|`Array<string \| number \| CheckboxOption>`|`-`|2.27.0|
|direction|复选框的排列方向|`Direction`|`'horizontal'`||
|disabled|是否禁用|`boolean`|`false`||
### `<checkbox-group>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `(string \| number \| boolean)[]`<br>ev: `Event`|
### `<checkbox-group>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|checkbox|自定义复选框|checked: `boolean`<br>disabled: `boolean`|2.27.0|
|label|checkbox 文案内容|data: `CheckboxOption`|2.27.0|




### CheckboxOption

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|文案|`RenderContent`|`-`|
|value|选项的 `value`|`string \| number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|indeterminate|是否为半选状态|`boolean`|`false`|


