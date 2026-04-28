```yaml
meta:
  type: Component
  category: Display
title: Calendar
description: Calendar Component.
```

*Auto translate by google.*

@import ./__demo__/basic.md
@import ./__demo__/select-header.md
@import ./__demo__/panel.md
@import ./__demo__/date-content.md

## API


### `<calendar>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`date`|`-`|
|default-value|Default value (uncontrolled state)|`date`|`-`|
|default-page-show-date|Default page date|`date`|`-`|
|page-show-date|Page date|`date`|`-`|
|mode|Mode|`'day' \| 'week' \| 'month' \| 'year'`|`-`|
|default-mode|Default Mode|`'day' \| 'week' \| 'month' \| 'year'`|`'month'`|
|modes|Displayed mode|`('day' \| 'week' \| 'month' \| 'year')[]`|`['month', 'year']`|
|panel-operations|Operation buttons configuration in card mode|`Array<'left' \| 'double-left' \| 'right' \| 'double-right'>`|`-`|
|header-type|Header type|`'button' \| 'select'`|`'button'`|
|allow-select|Whether to allow the selection and switching of the date|`boolean`|`true`|
|panel|Whether to be displayed in a container|`boolean`|`false`|
|panel-width|The width of the calendar in card mode|`number \| string`|`265`|
|panel-today-btn|Whether to display the button to jump to today|`boolean`|`false`|
|day-start-of-week|The first day of the week starts on the day of the week, 0-Sunday, 1-Monday|`'0' \| '1'`|`0`|
|is-week|Select Week date|`boolean`|`false`|
|disabled-date|Function that specifies the dates that cannot be selected|`(current: Dayjs) => boolean`|`-`|
|date-render|Customize the date display, which will completely cover the date cell|`(currentDate: Dayjs) => any`|`-`|
|date-inner-content|Customize the date cell, the content will be added to the cell|`(currentDate: Dayjs) => any`|`-`|
|month-render|Customize the month display, which will completely cover the month cell|`(currentDate: Dayjs) => any`|`-`|
|header-render|Custom header renderer|`(props: {  value?: Dayjs;  pageShowDate?: Dayjs;  mode?: string;  onChange: (date: Dayjs) => void;  onChangePageDate: (date: Dayjs) => void;  onChangeMode: (mode: 'day' \| 'week' \| 'month' \| 'year') => void;}) => any`|`-`|
### `<calendar>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Emitted when the date changes|date: `Date`|
|panel-change|Emitted when the page date changes|date: `Date`|
### `<calendar>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|header|Custom header content|year: `number`<br>month: `number`|2.53.0|
|default|Custom cell content|year: `number`<br>month: `number`<br>date: `number`|2.53.0|


