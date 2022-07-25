```yaml
meta:
  type: Component
  category: Data Display
title: Statistic
description: Highlight a certain number or group of numbers and statistical data with descriptions.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/prefix.md

@import ./__demo__/animation.md

@import ./__demo__/countdown.md

## API


### `<statistic>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|title|Title of the numerical display|`string`|`-`||
|value|Numerical display value|`number \| Date`|`-`||
|format|Format of numerical display [dayjs](https://day.js.org/docs/en/display/format) (used in date mode)|`string`|`'HH:mm:ss'`||
|extra|Additional display content|`string`|`-`||
|start|Whether to start animation|`boolean`|`true`||
|precision|Decimal reserved digits (used in digital mode)|`number`|`0`||
|separator|Carry separator (used in number mode)|`string`|`-`||
|show-group-separator|Whether to display the carry separator (used in number mode)|`boolean`|`false`||
|animation|Whether to turn on animation|`boolean`|`false`||
|animation-duration|Animation's duration time|`number`|`2000`||
|value-from|The starting value of the animation|`number`|`-`||
|placeholder|Prompt text (displayed when value is undefined )|`string`|`-`|2.28.0|
|value-style|Custom value style|`CSSProperties`|`-`|2.32.0|
### `<statistic>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|title|Title|-|
|prefix|Prefix|-|
|suffix|Suffix|-|
|extra|Extra content|-|




### `<countdown>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|title|Countdown title|`string`|`-`||
|value|Countdown value|`number`|`() => Date.now() + 300000`||
|now|Used to correct the incorrect display of the initialization time|`number`|`() => Date.now()`||
|format|Countdown display format [dayjs](https://day.js.org/docs/en/display/format)|`string`|`'HH:mm:ss'`||
|start|Whether to start the countdown|`boolean`|`true`||
|value-style|Custom value style|`CSSProperties`|`-`|2.32.0|
### `<countdown>` Events

|Event Name|Description|Parameters|
|---|---|---|
|finish|Callback at the end of the countdown|-|
### `<countdown>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|title|Title|-|


