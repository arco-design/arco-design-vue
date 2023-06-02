```yaml
meta:
  type: Component
  category: Feedback
title: Spin
description: Used for the loading state of pages and blocks-when a part of the page is waiting for asynchronous data or is in the rendering process, appropriate loading dynamics will effectively alleviate user anxiety.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/size.md

@import ./__demo__/dot.md

@import ./__demo__/container.md

@import ./__demo__/tip.md

@import ./__demo__/icon.md

## API


### `<spin>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|size|Size|`number`|`-`|
|loading|Whether it is loading state (Only effective in container mode)|`boolean`|`false`|
|dot|Whether to use dot type animation|`boolean`|`false`|
|tip|Prompt content|`string`|`-`|
|hide-icon|Whether to hide the icon|`boolean`|`false`|
### `<spin>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|tip|Custom tip|-|
|element|Custom element|-|
|icon|Custom icon (auto-rotation)|-|


