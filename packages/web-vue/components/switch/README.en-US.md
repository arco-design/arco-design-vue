```yaml
meta:
  type: Component
  category: Data Entry
title: Switch
description: Mutually exclusive operation controls, users can turn on or turn off a certain function.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/size.md

@import ./__demo__/disabled.md

@import ./__demo__/color.md

@import ./__demo__/value.md

@import ./__demo__/loading.md

@import ./__demo__/text.md

@import ./__demo__/icon.md

## API


### `<switch>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|model-value **(v-model)**|Value|`string\|number\|boolean`|`-`||
|default-checked|Default selected state (uncontrolled state)|`boolean`|`false`||
|disabled|Whether to disable|`boolean`|`false`||
|loading|Whether it is loading state|`boolean`|`false`||
|type|Type of switch|`'circle' \| 'round' \| 'line'`|`'circle'`||
|size|Size of switch|`'small' \| 'medium'`|`'medium'`||
|checked-value|Value when checked|`string\|number\|boolean`|`true`|2.12.0|
|unchecked-value|Value when unchecked|`string\|number\|boolean`|`false`|2.12.0|
|checked-color|The color of the switch when checked|`string`|`-`|2.12.0|
|unchecked-color|The color of the switch when unchecked|`string`|`-`|2.12.0|
### `<switch>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `union`|
### `<switch>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|checked-icon|The icon on the button when opened|-|
|unchecked-icon|The icon on the button when closed|-|
|checked|Copywriting when opened (not effective when `type='line'` and `size='small'`)|-|
|unchecked|Copywriting when closed (not effective when `type='line'` and `size='small'`)|-|


