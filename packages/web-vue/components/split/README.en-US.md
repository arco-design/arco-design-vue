```yaml
meta:
  type: Component
  category: Other
title: Split
description: Divide the panel into two parts.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/nested.md

## API


### `<split>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|component|The html tag of the split box|`string`|`'div'`|
|direction|Direction of division|`'horizontal' \| 'vertical'`|`'horizontal'`|
|size **(v-model)**|The size of the segmentation, it can be 0~1 representing a percentage, or a specific number of pixels, such as 300px|`number\|string`|`-`|
|default-size|Default split size, it can be 0~1 representing a percentage, or a specific number of pixels, such as 300px|`number\|string`|`0.5`|
|min|Minimum threshold, it can be 0~1 representing a percentage, or a specific number of pixels, such as 300px|`number\|string`|`-`|
|max|Maximum threshold, it can be 0~1 representing a percentage, or a specific number of pixels, such as 300px|`number\|string`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
### `<split>` Events

|Event Name|Description|Parameters|
|---|---|---|
|move-start|Triggered before dragging|-|
|moving|Triggered when dragging|-|
|move-end|Triggered after dragging ends|-|
### `<split>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|first|The contents of the first panel|-|
|resize-trigger|The contents of the resize pole|-|
|resize-trigger-icon|Resize pole icon|-|
|second|The contents of the second panel|-|


