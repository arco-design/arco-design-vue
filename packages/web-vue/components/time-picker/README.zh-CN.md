```yaml
meta:
  type: 组件
  category: 数据输入
title: 时间选择器 TimePicker
description: 在弹出面板上选择时间，以便捷完成时间输入的控件。
```

@import ./__demo__/basic.md

@import ./__demo__/rangepicker.md

@import ./__demo__/control.md

@import ./__demo__/default-value.md

@import ./__demo__/size.md

@import ./__demo__/disabled.md

@import ./__demo__/disabled-time.md

@import ./__demo__/disable-confirm.md

@import ./__demo__/format.md

@import ./__demo__/step.md

@import ./__demo__/extra.md

@import ./__demo__/use-12-hours.md

## API


### `<time-picker>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|选择器类型|`'time' \| 'time-range'`|`'time'`|
|model-value **(v-model)**|绑定值|`string \| number \| Date \| Array<string \| number \| Date>`|`-`|
|default-value|默认值|`string \| number \| Date \| Array<string \| number \| Date>`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|allow-clear|是否允许清除|`boolean`|`true`|
|readonly|是否为只读模式|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|format|展示日期的格式，参考[字符串解析格式](#字符串解析格式)|`string`|`'HH:mm:ss'`|
|placeholder|提示文案|`string \| string[]`|`-`|
|size|输入框尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|popup-container|弹出框的挂载容器|`string \| HTMLElement`|`-`|
|use12-hours|12 小时制|`boolean`|`false`|
|step|设置 时 / 分 / 秒 的选择间隔|`{  hour?: number;  minute?: number;  second?: number;}`|`-`|
|disabled-hours|禁用的部分小时选项|`() => number[]`|`-`|
|disabled-minutes|禁用的部分分钟选项|`(selectedHour?: number) => number[]`|`-`|
|disabled-seconds|禁用的部分秒数选项|`(selectedHour?: number, selectedMinute?: number) => number[]`|`-`|
|hide-disabled-options|隐藏禁止选择的选项|`boolean`|`false`|
|disable-confirm|禁用确认步骤，开启后直接点选时间不需要点击确认按钮|`boolean`|`false`|
|position|弹出的位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bl'`|
|popup-visible **(v-model)**|控制弹出框打开或者关闭|`boolean`|`-`|
|default-popup-visible|弹出框默认打开或者关闭|`boolean`|`false`|
|trigger-props|可以传入 `Trigger` 组件的参数|`TriggerProps`|`-`|
|unmount-on-close|是否在关闭后销毁 dom 结构|`boolean`|`false`|
### `<time-picker>` Events

|事件名|描述|参数|
|---|---|---|
|change|组件值发生改变|timeString: `string \| Array<string \| undefined> \| undefined`<br>time: `date \| Array<date \| undefined> \| undefined`|
|select|选择时间但未触发组件值变化|timeString: `string \| Array<string \| undefined>`<br>time: `Date \| Array<Date \| undefined>`|
|clear|点击清除按钮|-|
|popup-visible-change|弹出框展开和收起|visible: `boolean`|
### `<time-picker>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|prefix|输入框前缀|-|2.41.0|
|suffix-icon|输入框后缀图标|-||
|extra|额外的页脚|-||



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
