```yaml
meta:
  type: Component
  category: Feedback
title: Alert
description: When warning information is displayed to the user, the warning prompt is used to display the information that needs attention.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/type.md

@import ./__demo__/title.md

@import ./__demo__/closable.md

@import ./__demo__/close-element.md

@import ./__demo__/icon.md

@import ./__demo__/action.md

@import ./__demo__/banner.md

## API


### `<alert>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|type|Type of the alert. 2.41.0 Added `normal` type|`info \| success \| warning \| error \| normal`|`'info'`|
|show-icon|Whether to show the icon|`boolean`|`true`|
|closable|Whether to show the close button|`boolean`|`false`|
|title|The title of the alert|`string`|`-`|
|banner|Whether to use as the top announcement (remove the border and rounded corners)|`boolean`|`false`|
|center|Whether the content is displayed in the center|`boolean`|`false`|
### `<alert>` Events

|Event Name|Description|Parameters|
|---|---|---|
|close|Triggered when the close button is clicked|ev: `MouseEvent`|
|after-close|Triggered after the close animation ends|-|
### `<alert>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|icon|Icon|-||
|title|Title|-||
|action|Actions|-||
|close-element|Close element|-|2.36.0|


