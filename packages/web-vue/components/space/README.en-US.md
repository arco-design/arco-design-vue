```yaml
meta:
  type: Component
  category: Layout
title: Space
description: Set the spacing between components.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/vertical.md

@import ./__demo__/size.md

@import ./__demo__/align.md

@import ./__demo__/wrap.md

@import ./__demo__/split.md

## API


### `<space>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|align|Alignment|`'start' \| 'end' \| 'center' \| 'baseline'`|`-`||
|direction|Spacing direction|`'vertical' \| 'horizontal'`|`'horizontal'`||
|size|Spacing size, support for setting horizontal and vertical spacing separately|`number \| 'mini' \| 'small' \| 'medium' \| 'large' \| [SpaceSize, SpaceSize]`|`'small'`||
|wrap|The spacing of the wrapping type, used in the scene of wrapping.|`boolean`|`false`||
|fill|fill the block|`boolean`|`false`|2.11.0|
### `<space>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|split|Set separator|-|



## Type
```ts
type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';
```


## FAQ
### On dynamic rendering of sub elements, nodes are not reused
It can be solved by adding 'key' to the sub element of 'space'
```vue
<template>
  <a-space>
    <a-button type="primary" :key="1"> Item1</a-button>
    <a-button type="primary" :key="2">Item2</a-button>
  </a-space>
</template>
```
