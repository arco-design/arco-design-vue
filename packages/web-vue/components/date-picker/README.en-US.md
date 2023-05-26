```yaml
meta:
  type: Component
  category: Data Entry
title: DatePicker
description: Choose a date. Support year, month, week, day type, support range selection, etc.
```

*Auto translate by google.*


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

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|locale|Internationalization configuration, used to cover the locale file in the `datePicker` field|`Record<string, any>`|`-`||
|hide-trigger|There is no trigger element, only the selection panel is displayed|`boolean`|`false`||
|allow-clear|Whether to allow clear|`boolean`|`true`||
|readonly|Whether it is read-only|`boolean`|`false`||
|error|Whether it is an error state|`boolean`|`false`||
|size|The size of the date picker|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|shortcuts|Quick selection of preset time range|`ShortcutType[]`|`[]`||
|shortcuts-position|The position of the preset range on the panel, which is placed at the bottom by default, and the side is generally used for scenes with a large number of preset times|`'left' \| 'bottom' \| 'right'`|`'bottom'`||
|position|The position of the pop-up box|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bl'`||
|popup-visible|Control the open or closed state of the pop-up box|`boolean`|`-`||
|default-popup-visible|The default pop-up box is open or closed|`boolean`|`false`||
|trigger-props|You can pass in the parameters of the `Trigger` component|`TriggerProps`|`-`||
|unmount-on-close|Whether to destroy the DOM structure when hiding|`boolean`|`false`||
|placeholder|Prompt copy|`string`|`-`||
|disabled|Whether to disable|`boolean`|`false`||
|disabled-date|Unselectable date|`(current?: Date) => boolean`|`-`||
|disabled-time|Unselectable time|`(current: Date) => DisabledTimeProps`|`-`||
|picker-value **(v-model)**|Date displayed on the panel|`Date \| string \| number`|`-`||
|default-picker-value|The date displayed on the panel by default|`Date \| string \| number`|`-`||
|popup-container|Mount container for pop-up box|`string \| HTMLElement \| null \| undefined`|`-`||
|value-format|The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ). If not specified, it will be formatted as a string, in the same format as `format`.|`'timestamp' \| 'Date' \| string`|`-`|2.16.0|
|preview-shortcut|Whether to preview the result of the shortcut|`boolean`|`true`|2.28.0|
|show-confirm-btn|Whether to show the confirm button, always show when `showTime = true`.|`boolean`|`false`|2.29.0|
|disabled-input|Whether input is disabled with the keyboard.|`boolean`|`false`|2.43.0|
|abbreviation|Whether to enable abbreviation|`boolean`|`true`|2.45.0|
### `Common` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|The component value changes|value: `Date \| string \| number \| undefined`<br>date: `Date \| undefined`<br>dateString: `string \| undefined`|
|select|The selected date has changed but the component value has not changed|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
|popup-visible-change|Open or close the pop-up box|visible: `boolean`|
|ok|Click the confirm button|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
|clear|Click the clear button|-|
|select-shortcut|Click on the shortcut option|shortcut: `ShortcutType`|
|picker-value-change|Panel date change|value: `Date \| string \| number`<br>date: `Date`<br>dateString: `string`|
### `Common` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|prefix|Input box prefix|-|2.41.0|
|suffix-icon|Input box suffix icon|-||
|icon-next-double|Double arrow page backward icon|-||
|icon-prev-double|Double arrow page forward icon|-||
|icon-next|Single arrow page backward icon|-||
|icon-prev|Single arrow page forward icon|-||
|cell|Customize the contents of the date cell|date: `Date`||
|extra|Extra footer|-||




### `<date-picker>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`Date \| string \| number`|`-`||
|default-value|Default value|`Date \| string \| number`|`-`||
|format|Display the format of the date, refer to [String Parsing Format](#string-parsing-format)|`string \| ((current: Date) => string)`|`-`||
|day-start-of-week|The first day of the week starts on the day of the week, 0-Sunday, 1-Monday, and so on.|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|
|show-time|Whether to increase time selection|`boolean`|`false`||
|time-picker-props|Time display parameters, refer to [TimePickerProps](/vue/component/time-picker)|`Partial<TimePickerProps>`|`-`||
|disabled|Whether to disable|`boolean`|`false`||
|disabled-date|Unselectable date|`(current?: Date) => boolean`|`-`||
|disabled-time|Unselectable time|`(current: Date) => DisabledTimeProps`|`-`||
|show-now-btn|Whether to display `showTime`, select the button of the current time|`boolean`|`true`||




### `<month-picker>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`Date \| string \| number`|`-`|
|default-value|Default value|`Date \| string \| number`|`-`|
|format|Display the format of the date, refer to [String Parsing Format](#String Parsing Format)|`string`|`'YYYY-MM'`|




### `<year-picker>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`Date \| string \| number`|`-`|
|default-value|Default value|`Date \| string \| number`|`-`|
|format|Display the format of the date, refer to [String Parsing Format](#String Parsing Format)|`string`|`'YYYY'`|




### `<quarter-picker>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`Date \| string \| number`|`-`||
|default-value|Default value|`Date \| string \| number`|`-`||
|format|Display the format of the date, refer to [String Parsing Format](#String Parsing Format)|`string`|`'YYYY-[Q]Q'`||
|value-format|The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ).|`string`|`'YYYY-MM'`|2.16.0|




### `<week-picker>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`Date \| string \| number`|`-`||
|default-value|Default value|`Date \| string \| number`|`-`||
|format|Display the format of the date, refer to [String Parsing Format](#String Parsing Format)|`string`|`'gggg-wo'`||
|value-format|The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ).|`string`|`'YYYY-MM-DD'`|2.16.0|
|day-start-of-week|The first day of the week starts on the day of the week, 0-Sunday, 1-Monday, and so on.|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|




### `<range-picker>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|mode|Type of range selector|`'date' \| 'year' \| 'quarter' \| 'month' \| 'week'`|`'date'`||
|model-value **(v-model)**|Value|`(Date \| string \| number)[]`|`-`||
|default-value|Default value|`(Date \| string \| number)[]`|`-`||
|picker-value|The date displayed in the default panel|`(Date \| string \| number)[]`|`-`||
|default-picker-value|Date displayed on the panel|`(Date \| string \| number)[]`|`-`||
|disabled|Whether to disable|`boolean \| boolean[]`|`false`||
|day-start-of-week|The first day of the week starts on the day of the week, 0-Sunday, 1-Monday, and so on.|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2-6 from 2.21.0|
|format|Display the format of the date, refer to [String Parsing Format](#string-parsing-format)|`string`|`-`||
|value-format|The format of the value, valid for `value` `defaultValue` `pickerValue` `defaultPickerValue` and the return value in the event, supports setting as timestamp, Date and string (refer to [String parsing format](#string-parsing-format) ). If not specified, it will be formatted as a string, in the same format as `format`.|`'timestamp' \| 'Date' \| string`|`-`|2.16.0|
|show-time|Whether to increase time selection|`boolean`|`false`||
|time-picker-props|Time display parameters, refer to [TimePickerProps](/vue/component/time-picker)|`Partial<TimePickerProps>`|`-`||
|placeholder|Prompt copy|`string[]`|`-`||
|disabled-date|Non-selectable date|`(current: Date, type: 'start' \| 'end') => boolean`|`-`||
|disabled-time|Unselectable time|`(current: Date, type: 'start' \| 'end') => DisabledTimeProps`|`-`||
|separator|The segmentation symbol in the input box of the range selector|`string`|`-`||
|exchange-time|Whether the time will be exchanged, by default time will affect and participate in the ordering of start and end values, if you want to fix the time order, you can turn it off.|`boolean`|`true`|2.25.0|
|disabled-input|Whether input is disabled with the keyboard.|`boolean`|`false`|2.43.0|
|abbreviation|Whether to enable abbreviation|`boolean`|`true`||
### `<range-picker>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|The component value changes|value: `(Date \| string \| number \| undefined)[] \| undefined`<br>date: `(Date \| undefined)[] \| undefined`<br>dateString: `(string \| undefined)[] \| undefined`|
|select|The selected date has changed but the component value has not changed|value: `(Date \| string \| number \| undefined)[]`<br>date: `(Date \| undefined)[]`<br>dateString: `(string \| undefined)[]`|
|popup-visible-change|Open or close the pop-up box|visible: `boolean`|
|ok|Click the confirm button|value: `Date \| string \| number[]`<br>date: `Date[]`<br>dateString: `string[]`|
|clear|Click the clear button|-|
|select-shortcut|Click on the shortcut option|shortcut: `ShortcutType`|
|picker-value-change|Panel date change|value: `Date \| string \| number[]`<br>date: `Date[]`<br>dateString: `string[]`|




### ShortcutType

|Name|Description|Type|Default|
|---|---|---|:---:|
|label|the content of shortcut|`string \| number \| (() => VNode)`|`-`|
|value|the value of shortcut|`(Date \| string \| number)    \| (Date \| string \| number)[]    \| (() => (Date \| string \| number) \| (Date \| string \| number)[])`|`-`|
|format|the format use to parse value, refer to [String Parsing Format](#string-parsing-format)|`string`|`-`|



### String parsing format

Format|Output|Description
---|---|---:
`YY`|21|Two-digit year
`YYYY`|2021|Four-digit year
`M`|1-12|Month, starting from 1
`MM`|01-12|Month, two digits
`MMM`|Jan-Dec|Abbreviated month name
`MMMM`|January-December|Full month name
`D`|1-31|Day of the month
`DD`|01-31|Day of the month, two digits
`d`|0-6|Day of the week, Sunday is 0
`dd`|Su-Sa|The shortest name of the day of the week
`ddd`|Sun-Sat|Abbreviated name of the day of the week
`dddd`|Sunday-Saturday|The name of the day of the week
`H`|0-23|Hour
`HH`|00-23|Hour, two digits
`h`|1-12|Hour, 12-hour clock
`hh`|01-12|Hour, 12-hour clock, two digits
`m`|0-59|Minute
`mm`|00-59|Minute, two digits
`s`|0-59|Second
`ss`|00-59|Second, two digits
`S`|0-9|Hundreds of milliseconds, one digits
`SS`|00-99|Tens of milliseconds, two digits
`SSS`|000-999|Millisecond, three digits
`Z`|-5:00|UTC offset
`ZZ`|-0500|UTC offset, add 0 in front of the number
`A`|AM PM|-
`a`|am pm|-
`Do`|1st... 3st|Day of month with serial number
`X`|1410715640.579|Unix timestamp
`x`|1410715640579|Unix millisecond timestamp


## FAQ

### About the `locale` field
The `locale` field can be configured using the language pack provided by the component library.
