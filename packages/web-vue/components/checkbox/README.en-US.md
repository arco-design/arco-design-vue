```yaml
meta:
  type: Component
  category: Data Entry
title: Checkbox
description: In a set of data, the user can select one or more data through the check box.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/disabled.md

@import ./__demo__/group.md

@import ./__demo__/options.md

@import ./__demo__/all.md

@import ./__demo__/custom.md

## API


### `<checkbox>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`boolean \| Array<string \| number \| boolean>`|`-`|
|default-checked|Whether checked by default (uncontrolled state)|`boolean`|`false`|
|value|The `value` of the option|`string \| number`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|indeterminate|Whether it is half-selected|`boolean`|`false`|
### `<checkbox>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `boolean \| Array<string \| number \| boolean>`|
### `<checkbox>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|checkbox|Custom checkbox|-|2.18.0|




### `<checkbox-group>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`Array<string \| number \| boolean>`|`-`|
|default-value|Default value (uncontrolled state)|`Array<string \| number \| boolean>`|`[]`|
|options|Default value (uncontrolled state)|`Array<string \| number \| CheckboxOption>`|`[]`|
|direction|Arrangement direction of checkboxes|`Direction`|`'horizontal'`|
|disabled|Whether to disable|`boolean`|`false`|
### `<checkbox-group>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `Array<string \| number \| boolean>`|
### `<checkbox-group>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|label|checkbox label content|-|




### CheckboxOption

|Name|Description|Type|Default|
|---|---|---|:---:|
|label|label content|`string \| VNode`|`-`|
|value|The `value` of the option|`string \| number`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|indeterminate|Whether it is half-selected|`true`|`-`|
|onChange|Trigger when the value changes|`(    value: boolean \| Array<string \| number \| boolean>,    ev: Event  ) => void`|`-`|


