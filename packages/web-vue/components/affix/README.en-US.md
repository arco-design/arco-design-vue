```yaml
meta:
  type: Component
  category: Other
title: Affix
description: Pin the page elements to the visible range. When the content area is relatively long and the page needs to be scrolled, the fixed pin can fix the content on the screen. Often used for side menus and button combinations.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/top.md

@import ./__demo__/bottom.md

@import ./__demo__/fix-change.md

@import ./__demo__/container.md

## API


### `<affix>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|offset-top|Triggered when the specified offset is reached from the top of the window|`number`|`0`|
|offset-bottom|Triggered when the specified offset is reached from the bottom of the window|`number`|`-`|
|target|Scroll container, default is `window`|`string \| HTMLElement \| Window`|`-`|
|target-container|The outer scroll element of `target`, the default is `window`. `Affix` will monitor the scroll event of the element and update the position of the anchor in real time. The main purpose is to solve the problem that if the outer element scrolls when the target attribute is specified as a non-window element, it may cause the nail to escape from the container.|`string \| HTMLElement \| Window`|`-`|
### `<affix>` Events

|Event Name|Description|Parameters|
|---|---|---|
|change|Triggered when the fixed state changes|fixed: `boolean`|
### `<affix>` Methods

|Method|Description|Parameters|Return|
|---|---|---|:---:|
|updatePosition|Update position|-|-|


