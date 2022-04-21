```yaml
meta:
  type: Component
  category: Data Entry
title: Rate
description: The component used for scoring or starring.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/half.md

@import ./__demo__/color.md

@import ./__demo__/readonly.md

@import ./__demo__/clear.md

@import ./__demo__/character.md

@import ./__demo__/count.md

@import ./__demo__/grading.md

## API


### `<rate>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|count|Total number of rate|`number`|`5`||
|model-value **(v-model)**|Value|`number`|`-`||
|default-value|Default Value|`number`|`0`||
|allow-half|Whether to allow half selection|`boolean`|`false`||
|allow-clear|Whether to allow clear|`boolean`|`false`||
|grading|Whether to enable smile grading|`boolean`|`false`||
|readonly|Whether it is readonly|`boolean`|`false`||
|disabled|Whether to disable|`boolean`|`false`||
|color|Color|`string \| Record<string, string>`|`-`|2.18.0|
### `<rate>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `number`|
|hover-change|Triggered when the mouse moves over the value|value: `number`|
### `<rate>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|character|Character|index: `number`|


