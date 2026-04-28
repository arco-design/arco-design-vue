```yaml
meta:
  type: 组件
  category: 数据展示
title: 日历 Calendar
description: 日历组件。
```

@import ./__demo__/basic.md
@import ./__demo__/select-header.md
@import ./__demo__/panel.md
@import ./__demo__/date-content.md

## API


### `<calendar>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`date`|`-`|
|default-value|默认值（非受控状态）|`date`|`-`|
|default-page-show-date|默认展示的面板日期|`date`|`-`|
|page-show-date|展示的面板日期（受控）|`date`|`-`|
|mode|模式|`'day' \| 'week' \| 'month' \| 'year'`|`-`|
|default-mode|默认模式|`'day' \| 'week' \| 'month' \| 'year'`|`'month'`|
|modes|显示的模式|`('day' \| 'week' \| 'month' \| 'year')[]`|`['month', 'year']`|
|panel-operations|卡片模式下配置操作按钮|`Array<'left' \| 'double-left' \| 'right' \| 'double-right'>`|`-`|
|header-type|头部类型|`'button' \| 'select'`|`'button'`|
|allow-select|是否允许选中和切换日期|`boolean`|`true`|
|panel|是否放在容器中进行展示|`boolean`|`false`|
|panel-width|卡片模式的宽度|`number \| string`|`265`|
|panel-today-btn|是否显示跳转到今天的按钮|`boolean`|`false`|
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一|`'0' \| '1'`|`0`|
|is-week|周选择|`boolean`|`false`|
|disabled-date|不可选取的时间|`(current: Dayjs) => boolean`|`-`|
|date-render|定制日期显示，会完全覆盖日期单元格|`(currentDate: Dayjs) => any`|`-`|
|date-inner-content|定制日期单元格，内容会被添加到单元格内|`(currentDate: Dayjs) => any`|`-`|
|month-render|定制月份显示，会完全覆盖月份单元格|`(currentDate: Dayjs) => any`|`-`|
|header-render|自定义头部渲染|`(props: {  value?: Dayjs;  pageShowDate?: Dayjs;  mode?: string;  onChange: (date: Dayjs) => void;  onChangePageDate: (date: Dayjs) => void;  onChangeMode: (mode: 'day' \| 'week' \| 'month' \| 'year') => void;}) => any`|`-`|
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


