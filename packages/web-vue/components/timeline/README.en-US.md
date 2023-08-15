```yaml
meta:
  type: Component
  category: Data Display
title: Timeline
description: Display information content in chronological or reverse order.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/icon.md

@import ./__demo__/dot.md

@import ./__demo__/type.md

@import ./__demo__/pending.md

@import ./__demo__/mode.md

@import ./__demo__/vertical.md

@import ./__demo__/direction.md

@import ./__demo__/label.md

@import ./__demo__/custom.md

## API


### `<timeline>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|reverse|Whether reverse order|`boolean`|`false`|
|direction|Timeline direction|`'horizontal' \| 'vertical'`|`'vertical'`|
|mode|The display mode of Timeline|`'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate'`|`'left'`|
|pending|Whether to display ghost nodes. When set to true, only ghost nodes are displayed. When passed to ReactNode, it will be displayed as node content|`boolean\|string`|`-`|
|label-position|Position of label text|`'relative' \| 'same'`|`'same'`|
### `<timeline>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|dot|Custom dot|-|




### `<timeline-item>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|dot-color|Dot color|`string`|`-`|
|dot-type|Dot type|`'hollow' \| 'solid'`|`'solid'`|
|line-type|Line type|`'solid' \| 'dashed' \| 'dotted'`|`'solid'`|
|line-color|Line Color|`string`|`-`|
|label|Label text|`string`|`-`|
|position|Item position|`PositionType`|`-`|
### `<timeline-item>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|dot|Custom dot|-||
|label|Custom label|-|2.50.0|


