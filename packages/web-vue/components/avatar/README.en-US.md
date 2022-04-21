```yaml
meta:
  type: Component
  category: Data Display
title: Avatar
description: Used as an avatar, it can be displayed in the form of pictures, icons or characters.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/size.md

@import ./__demo__/group.md

@import ./__demo__/icon.md

@import ./__demo__/fit.md

## API


### `<avatar>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|shape|The shape of the avatar, there are two kinds of circle (circle) and square (square)|`'circle' \| 'square'`|`'circle'`|
|size|The size of the avatar, the unit is `px`. Use size `40px` in styles when not filled|`number`|`-`|
|auto-fix-font-size|Whether to automatically adjust the font size according to the size of the avatar.|`boolean`|`true`|
|trigger-type|Clickable avatar interaction type|`'mask' \| 'button'`|`'button'`|
|trigger-icon-style|Interactive icon style|`CSSProperties`|`-`|
### `<avatar>` Events

|Event Name|Description|Parameters|
|---|---|---|
|click|Callback when clicked|event: `Event`event|
### `<avatar>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|trigger-icon|Clickable avatar interaction icon|-|




### `<avatar-group>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|shape|The shape of the avatar in the group, there are two kinds of circle (circle) and square (square)|`'circle' \| 'square'`|`'circle'`||
|size|The size of the avatar in the group, the unit is `px`|`number`|`-`||
|auto-fix-font-size|Whether to automatically adjust the font size according to the size of the avatar.|`boolean`|`true`||
|max-count|The maximum number of avatars displayed in the avatar group. The excess avatars will be displayed in the form of `+x`.|`number`|`0`||
|z-index-ascend|The avatar `z-index` in the avatar group increases, and the default is decreasing.|`boolean`|`false`||
|max-style|Style for +x.|`CSSProperties`|`-`|2.7.0|
|max-popover-trigger-props|TriggerProps for popover around +x.|`TriggerProps`|`-`|2.7.0|


