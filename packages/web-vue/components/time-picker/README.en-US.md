```yaml
meta:
  type: Component
  category: Data Entry
title: TimePicker
description: Select the time on the pop-up panel to conveniently complete the time input control.
```

*Auto translate by google.*

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

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|type|Selector type|`'time' \| 'time-range'`|`'time'`|
|model-value **(v-model)**|Value|`string \| number \| Date \| Array<string \| number \| Date>`|`-`|
|default-value|Default value|`string \| number \| Date \| Array<string \| number \| Date>`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|allow-clear|Whether to allow clear|`boolean`|`true`|
|readonly|Whether it is read-only mode|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|format|Display the format of the date, refer to [String Parsing Format](#String Parsing Format)|`string`|`'HH:mm:ss'`|
|placeholder|Prompt copy|`string \| string[]`|`-`|
|size|Input box size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|popup-container|Mount container for pop-up box|`string \| HTMLElement`|`-`|
|use12-hours|12 hour clock|`boolean`|`false`|
|step|Set the hour/minute/second selection interval|`{  hour?: number;  minute?: number;  second?: number;}`|`-`|
|disabled-hours|Disabled partial hour options|`() => number[]`|`-`|
|disabled-minutes|Disabled some minutes options|`(selectedHour?: number) => number[]`|`-`|
|disabled-seconds|Disabled partial seconds option|`(selectedHour?: number, selectedMinute?: number) => number[]`|`-`|
|hide-disabled-options|Hide prohibited options|`boolean`|`false`|
|disable-confirm|Disable the confirmation step, click the time directly after opening, without clicking the confirmation button|`boolean`|`false`|
|position|Pop-up position|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bl'`|
|popup-visible **(v-model)**|Control the pop-up box to open or close|`boolean`|`-`|
|default-popup-visible|The pop-up box is opened or closed by default|`boolean`|`false`|
|trigger-props|You can pass in the parameters of the `Trigger` component|`TriggerProps`|`-`|
|unmount-on-close|Whether to destroy the dom structure after closing|`boolean`|`false`|
### `<time-picker>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|The component value changes|timeString: `string \| Array<string \| undefined> \| undefined`<br>time: `date \| Array<date \| undefined> \| undefined`|
|select|Select time but do not trigger component value change|timeString: `string \| Array<string \| undefined>`<br>time: `Date \| Array<Date \| undefined>`|
|clear|Click the clear button|-|
|popup-visible-change|Pop-up box expand and collapse|visible: `boolean`|
### `<time-picker>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|prefix|Input box prefix|-|2.41.0|
|suffix-icon|Input box suffix icon|-||
|extra|Extra footer|-||



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
