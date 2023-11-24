```yaml
meta:
  type: Component
  category: Display
title: Calendar
description: Calendar Component.
```

*Auto translate by google.*

@import ./__demo__/basic.md

## API


### `<calendar>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`date`|`-`|
|default-value|Default value (uncontrolled state)|`date`|`-`|
|mode|Mode|`'month' \| 'year'`|`-`|
|default-mode|Default Mode|`'month' \| 'year'`|`'month'`|
|modes|Displayed mode|`('month' \| 'year')[]`|`['month', 'year']`|
### `<calendar>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Emitted when the button is clicked|date: `Date`|
|panel-change|Emitted when the button is clicked|date: `Date`|
### `<calendar>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|header|Custom header content|year: `number`<br>month: `number`|2.53.0|
|default|Custom cell content|year: `number`<br>month: `number`<br>date: `number`|2.53.0|


