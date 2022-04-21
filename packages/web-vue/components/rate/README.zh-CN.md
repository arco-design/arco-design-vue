```yaml
meta:
  type: 组件
  category: 数据输入
title: 评分 Rate
description: 用于评分或打星的组件。
```

@import ./__demo__/basic.md

@import ./__demo__/half.md

@import ./__demo__/color.md

@import ./__demo__/readonly.md

@import ./__demo__/clear.md

@import ./__demo__/character.md

@import ./__demo__/count.md

@import ./__demo__/grading.md

## API


### `<rate>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|count|评分的总数|`number`|`5`||
|model-value **(v-model)**|绑定值|`number`|`-`||
|default-value|默认值|`number`|`0`||
|allow-half|是否允许半选|`boolean`|`false`||
|allow-clear|是否允许清除|`boolean`|`false`||
|grading|是否开启笑脸分级|`boolean`|`false`||
|readonly|是否为只读状态|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`false`||
|color|颜色|`string \| Record<string, string>`|`-`|2.18.0|
### `<rate>` Events

|事件名|描述|参数|
|---|---|---|
|change|值改变时触发|value: `number`|
|hover-change|鼠标移动到数值上时触发|value: `number`|
### `<rate>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|character|符号|index: `number`|


