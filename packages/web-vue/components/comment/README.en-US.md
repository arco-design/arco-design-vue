```yaml
meta:
  type: Component
  category: Data Display
title: Comment
description: Display a comment.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/align.md

@import ./__demo__/nest.md

@import ./__demo__/editor.md

## API


### `<comment>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|author|Display as the comment author|`string`|`-`|
|avatar|Display as the comment avatar|`string`|`-`|
|content|The content of the comment|`string`|`-`|
|datetime|Display as the comment datetime|`string`|`-`|
|align|Alignment of `datetime` and `actions`|`'left' \| 'right' \| { datetime?: "left" \| "right"; actions?: "left" \| "right" }`|`'left'`|
### `<comment>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|avatar|Avatar|-|
|author|Author name|-|
|datetime|Datetime info|-|
|content|Comment content|-|
|actions|Action list|-|


