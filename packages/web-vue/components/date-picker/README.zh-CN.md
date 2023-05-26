```yaml
meta:
  type: 组件
  category: 数据输入
title: 日期选择器 DatePicker
description: 选择日期。支持年、月、周、日类型，支持范围选择等。
```


@import ./__demo__/basic.md

@import ./__demo__/month.md

@import ./__demo__/year.md

@import ./__demo__/quarter.md

@import ./__demo__/week.md

@import ./__demo__/showtime.md

@import ./__demo__/range.md

@import ./__demo__/default-value.md

@import ./__demo__/disabled-date.md

@import ./__demo__/shortcuts.md

@import ./__demo__/shortcuts-position.md

@import ./__demo__/disabled-date-advance.md

@import ./__demo__/size.md

@import ./__demo__/extra.md

@import ./__demo__/disabled.md

@import ./__demo__/date-render.md

@import ./__demo__/control.md

@import ./__demo__/trigger-element.md

@import ./__demo__/panel-only.md

## API


### `Common` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|locale|国际化配置，用于覆盖locale中的 `datePicker` 字段|`Record<string, any>`|`-`||
|hide-trigger|没有触发元素，只显示选择面板|`boolean`|`false`||
|allow-clear|是否允许清除|`boolean`|`true`||
|readonly|是否为只读|`boolean`|`false`||
|error|是否为错误状态|`boolean`|`false`||
|size|日期选择器的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|shortcuts|预设时间范围快捷选择|`ShortcutType[]`|`[]`||
|shortcuts-position|预设范围在面板上的位置，默认放在下方，侧边一般用于大量预设时间的场景|`'left' \| 'bottom' \| 'right'`|`'bottom'`||
|position|弹出的框的位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bl'`||
|popup-visible|控制弹出框的打开或者关闭状态|`boolean`|`-`||
|default-popup-visible|默认弹出框是打开或者关闭|`boolean`|`false`||
|trigger-props|可以传入 `Trigger` 组件的参数|`TriggerProps`|`-`||
|unmount-on-close|是否在隐藏的时候销毁DOM结构|`boolean`|`false`||
|placeholder|提示文案|`string`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|disabled-date|不可选取的日期|`(current?: Date) => boolean`|`-`||
|disabled-time|不可选取的时间|`(current: Date) => DisabledTimeProps`|`-`||
|picker-value **(v-model)**|面板显示的日期|`Date \| string \| number`|`-`||
|default-picker-value|面板默认显示的日期|`Date \| string \| number`|`-`||
|popup-container|弹出框的挂载容器|`string \| HTMLElement \| null \| undefined`|`-`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。如果没有指定，将格式化为字符串，格式同 `format`。|`'timestamp' \| 'Date' \| string`|`-`|2.16.0|
|preview-shortcut|是否要预览快捷选择的结果|`boolean`|`true`|2.28.0|
|show-confirm-btn|是否显示确认按钮，`showTime = true` 的时候始终显示。|`boolean`|`false`|2.29.0|
|disabled-input|是否禁止键盘输入日期|`boolean`|`false`|2.43.0|
|abbreviation|是否启用缩写|`boolean`|`true`|2.45.0|
### `Common` Events

|事件名|描述|参数|
|---|---|---|
|change|组件值发生改变|value: `Date \| string \| number \| undefined`<br>date: `Date \| undefined`<br>dateString: `string \| undefined`|
|select|选中日期发生改变但组件值未改变|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
|popup-visible-change|打开或关闭弹出框|visible: `boolean`|
|ok|点击确认按钮|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
|clear|点击清除按钮|-|
|select-shortcut|点击快捷选项|shortcut: `ShortcutType`|
|picker-value-change|面板日期改变|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
### `Common` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|prefix|输入框前缀|-|2.41.0|
|suffix-icon|输入框后缀图标|-||
|icon-next-double|双箭头往后翻页图标|-||
|icon-prev-double|双箭头往前翻页图标|-||
|icon-next|单箭头往后翻页图标|-||
|icon-prev|单箭头往前翻页图标|-||
|cell|自定义日期单元格的内容|date: `Date`||
|extra|额外的页脚|-||




### `<date-picker>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`||
|default-value|默认值|`Date \| string \| number`|`-`||
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string \| ((current: Date) => string)`|`-`||
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|
|show-time|是否增加时间选择|`boolean`|`false`||
|time-picker-props|时间显示的参数，参考 [TimePickerProps](/vue/component/time-picker)|`Partial<TimePickerProps>`|`-`||
|disabled|是否禁用|`boolean`|`false`||
|disabled-date|不可选取的日期|`(current?: Date) => boolean`|`-`||
|disabled-time|不可选取的时间|`(current: Date) => DisabledTimeProps`|`-`||
|show-now-btn|是否显示 `showTime` 时，选择当前时间的按钮|`boolean`|`true`||




### `<month-picker>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`|
|default-value|默认值|`Date \| string \| number`|`-`|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'YYYY-MM'`|




### `<year-picker>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`|
|default-value|默认值|`Date \| string \| number`|`-`|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'YYYY'`|




### `<quarter-picker>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`||
|default-value|默认值|`Date \| string \| number`|`-`||
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'YYYY-[Q]Q'`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。|`string`|`'YYYY-MM'`|2.16.0|




### `<week-picker>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model-value **(v-model)**|绑定值|`Date \| string \| number`|`-`||
|default-value|默认值|`Date \| string \| number`|`-`||
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'gggg-wo'`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。|`string`|`'YYYY-MM-DD'`|2.16.0|
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|




### `<range-picker>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|mode|范围选择器的类型|`'date' \| 'year' \| 'quarter' \| 'month' \| 'week'`|`'date'`||
|model-value **(v-model)**|绑定值|`(Date \| string \| number)[]`|`-`||
|default-value|默认值|`(Date \| string \| number)[]`|`-`||
|picker-value|默认面板显示的日期|`(Date \| string \| number)[]`|`-`||
|default-picker-value|面板显示的日期|`(Date \| string \| number)[]`|`-`||
|disabled|是否禁用|`boolean \| boolean[]`|`false`||
|day-start-of-week|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`-`||
|value-format|值的格式，对 `value` `defaultValue` `pickerValue` `defaultPickerValue` 以及事件中的返回值生效，支持设置为时间戳，Date 和字符串（参考[字符串解析格式](#字符串解析格式)）。如果没有指定，将格式化为字符串，格式同 `format`。|`'timestamp' \| 'Date' \| string`|`-`|2.16.0|
|show-time|是否增加时间选择|`boolean`|`false`||
|time-picker-props|时间显示的参数，参考 [TimePickerProps](/vue/component/time-picker)|`Partial<TimePickerProps>`|`-`||
|placeholder|提示文案|`string[]`|`-`||
|disabled-date|不可选的日期|`(current: Date, type: 'start' \| 'end') => boolean`|`-`||
|disabled-time|不可选取的时间|`(current: Date, type: 'start' \| 'end') => DisabledTimeProps`|`-`||
|separator|范围选择器输入框内的分割符号|`string`|`-`||
|exchange-time|时间是否会交换，默认情况下时间会影响和参与开始和结束值的排序，如果要固定时间顺序，可将其关闭。|`boolean`|`true`|2.25.0|
|disabled-input|是否禁止键盘输入日期|`boolean`|`false`|2.43.0|
|abbreviation|是否启用缩写|`boolean`|`true`||
### `<range-picker>` Events

|事件名|描述|参数|
|---|---|---|
|change|组件值发生改变|value: `(Date \| string \| number \| undefined)[] \| undefined`<br>date: `(Date \| undefined)[] \| undefined`<br>dateString: `(string \| undefined)[] \| undefined`|
|select|选中日期发生改变但组件值未改变|value: `(Date \| string \| number \| undefined)[]`<br>date: `(Date \| undefined)[]`<br>dateString: `(string \| undefined)[]`|
|popup-visible-change|打开或关闭弹出框|visible: `boolean`|
|ok|点击确认按钮|value: `Date \| string \| number[]`<br>date: `Date[]`<br>dateString: `string[]`|
|clear|点击清除按钮|-|
|select-shortcut|点击快捷选项|shortcut: `ShortcutType`|
|picker-value-change|面板日期改变|value: `Date \| string \| number[]`<br>date: `Date[]`<br>dateString: `string[]`|




### ShortcutType

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项的内容|`string \| number \| (() => VNode)`|`-`|
|value|选项值|`(Date \| string \| number)    \| (Date \| string \| number)[]    \| (() => (Date \| string \| number) \| (Date \| string \| number)[])`|`-`|
|format|解析值所使用的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`-`|



### 字符串解析格式

格式|输出|描述
---|---|---:
`YY`|21|两位数的年份
`YYYY`|2021|四位数年份
`M`|1-12|月份，从 1 开始
`MM`|01-12|月份，两位数
`MMM`|Jan-Dec|缩写的月份名称
`MMMM`|January-December|完整的月份名称
`D`|1-31|月份里的一天
`DD`|01-31|月份里的一天，两位数
`d`|0-6|一周中的一天，星期天是 0
`dd`|Su-Sa|最简写的一周中一天的名称
`ddd`|Sun-Sat|简写的一周中一天的名称
`dddd`|Sunday-Saturday|一周中一天的名称
`H`|0-23|小时
`HH`|00-23|小时，两位数
`h`|1-12|小时, 12 小时制
`hh`|01-12|小时, 12 小时制, 两位数
`m`|0-59|分钟
`mm`|00-59|分钟，两位数
`s`|0-59|秒
`ss`|00-59|秒，两位数
`S`|0-9|数百毫秒，一位数
`SS`|00-99|几十毫秒，两位数
`SSS`|000-999|毫秒，三位数字
`Z`|-5:00|UTC 的偏移量
`ZZ`|-0500|UTC 的偏移量，数字前面加上 0
`A`|AM PM|-
`a`|am pm|-
`Do`|1st... 3st|带序号的月份中的某天
`X`|1410715640.579|Unix 时间戳
`x`|1410715640579|Unix 毫秒时间戳

## FAQ

### 关于 `locale` 字段
可以使用组件库提供的语言包配置 `locale` 字段。

