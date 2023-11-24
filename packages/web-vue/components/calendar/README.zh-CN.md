```yaml
meta:
  type: 组件
  category: 数据展示
title: 日历 Calendar
description: 日历组件。
```

@import ./__demo__/basic.md

## API


### `<calendar>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`date`|`-`|
|default-value|默认值（非受控状态）|`date`|`-`|
|mode|模式|`'month' \| 'year'`|`-`|
|default-mode|默认模式|`'month' \| 'year'`|`'month'`|
|modes|显示的模式|`('month' \| 'year')[]`|`['month', 'year']`|
### `<calendar>` Events

|事件名|描述|参数|
|---|---|---|
|change|选择的日期改变时触发|date: `Date`|
|panel-change|日期面板改变时触发|date: `Date`|
### `<calendar>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|header|自定义头部内容|year: `number`<br>month: `number`|2.53.0|
|default|自定义单元格内容|year: `number`<br>month: `number`<br>date: `number`|2.53.0|


