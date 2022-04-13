```yaml
meta:
  type: Component
  category: Data Entry
title: Radio
description: In a set of related and mutually exclusive data, the user can only select one option.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/group.md

@import ./__demo__/direction.md

@import ./__demo__/button.md

@import ./__demo__/size.md

## API


### `<radio>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`string \| number \| boolean`|`-`|
|default-checked|Whether checked by default (uncontrolled state)|`boolean`|`false`|
|value|The `value` of the option|`string \| number \| boolean`|`true`|
|type|Radio type|`'radio' \| 'button'`|`'radio'`|
|disabled|Whether to disable|`boolean`|`false`|
### `<radio>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `string, number, boolean`|
### `<radio>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|radio|Custom radio|-|2.18.0|




### `<radio-group>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|model-value **(v-model)**|Value|`string \| number \| boolean`|`-`|
|default-value|Default value (uncontrolled state)|`string \| number \| boolean`|`''`|
|type|Types of radio group|`'radio' \| 'button'`|`'radio'`|
|size|The size of the radio group|`'mini' \| 'small' \| 'medium' \| 'large'`|`-`|
|direction|The direction of the radio group|`'horizontal' \| 'vertical'`|`'horizontal'`|
|disabled|Whether to disable|`boolean`|`false`|
### `<radio-group>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Trigger when the value changes|value: `(string \| number)`|


