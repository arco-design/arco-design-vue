```yaml
meta:
  type: Component
  category: Data Display
title: Tag
description: Used for the selection, screening and classification of information. Users use tags for information feedback and interactive operations.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/closeable.md

@import ./__demo__/checkable.md

@import ./__demo__/color.md

@import ./__demo__/size.md

@import ./__demo__/loading.md

@import ./__demo__/icon.md

## API


### `<tag>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|color|Label color|`'red' \| 'orangered' \| 'orange' \| 'gold' \| 'lime' \| 'green' \| 'cyan' \| 'blue' \| 'arcoblue' \| 'purple' \| 'pinkpurple' \| 'magenta' \| 'gray'`|`-`|
|size|Label size|`'small' \| 'medium' \| 'large'`|`'medium'`|
|visible **(v-model)**|Whether the tag is visible|`boolean`|`-`|
|default-visible|Whether the tag is visible by default|`boolean`|`true`|
|loading|Whether the tag is loading state|`boolean`|`false`|
|closable|Whether the tag can be closed|`boolean`|`false`|
|checkable|Whether the tag can be checked|`boolean`|`false`|
|checked **(v-model)**|Whether the tag is checked (available when the tag is checkable)|`boolean`|`-`|
|default-checked|Whether the tag is checked by default (available when the tag is checkable)|`boolean`|`true`|
### `<tag>` Events

|Event Name|Description|Parameters|
|---|---|---|
|close|Emitted when the close button is clicked|-|
|check|Emitted when the user check (emit only in the checkable mode)|-|
### `<tag>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|icon|Icon|-|
|close-icon|Close button icon|-|


