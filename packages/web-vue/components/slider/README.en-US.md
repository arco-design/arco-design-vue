```yaml
meta:
  type: Component
  category: Data Entry
title: Slider
description: Sliding input device, showing current value and selectable range.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/disabled.md

@import ./__demo__/step.md

@import ./__demo__/marks.md

@import ./__demo__/range.md

@import ./__demo__/input.md

@import ./__demo__/vertical.md

@import ./__demo__/tooltip.md

## API


### `<slider>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`number \| [number, number]`|`-`||
|default-value|Default value (uncontrolled state)|`number \| [number, number]`|`0`||
|step|Sliding step|`number`|`1`||
|min|Minimum sliding range|`number`|`0`||
|marks|Set the displayed label|`Record<number, string>`|`-`||
|max|Maximum sliding range|`number`|`100`||
|direction|The direction of the slider|`Direction`|`'horizontal'`||
|disabled|Whether to disable|`boolean`|`false`||
|show-ticks|Whether to show ticks|`boolean`|`false`||
|show-input|Whether to show the input|`boolean`|`false`||
|range|Whether to use range selection|`boolean`|`false`||
|show-tooltip|Whether to show tooltip|`boolean`|`true`|2.42.0|
### `<slider>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `number \| [number, number]`|


