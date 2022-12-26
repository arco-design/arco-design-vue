```yaml
meta:
  type: Component
  category: Data Display
title: Badge
description: Badge normally appears in the upper right corner of the icon or text to prompt important information.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/alone.md

@import ./__demo__/dot.md

@import ./__demo__/text.md

@import ./__demo__/max.md

@import ./__demo__/status.md

@import ./__demo__/color.md

## API


### `<badge>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|text|Set the display text of the status dot|`string`|`-`|
|dot|Whether to display a red dot instead of `count`|`boolean`|`false`|
|dot-style|Customize badge dot style|`object`|`-`|
|max-count|Max count to show. If count is larger than this value, it will be displayed as `${maxCount}+`|`number`|`99`|
|offset|Set offset of the badge dot|`number[]`|`[]`|
|color|Customize dot color|`ColorType \| string`|`-`|
|status|Badge status|`'normal' \| 'processing' \| 'success' \| 'warning' \| 'danger'`|`-`|
|count|Number to show in badge|`number`|`-`|


