```yaml
meta:
  type: Component
  category: Feedback
title: Drawer
description: A drawer-like panel that slides out from the side of the screen after the command is triggered.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/nested.md


### `<drawer>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|visible **(v-model)**|Whether the drawer is visible|`boolean`|`false`|
|default-visible|Whether the drawer is visible by default (uncontrolled mode)|`boolean`|`false`|
|placement|Where the drawer is placed|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`|
|title|Title|`string`|`-`|
|mask|Whether to show the mask|`boolean`|`true`|
|mask-closable|Click on the mask layer to be able to close|`boolean`|`true`|
|closable|Whether to show the close button|`boolean`|`true`|
|ok-text|The content of the ok button|`string`|`-`|
|cancel-text|The content of the cancel button|`string`|`-`|
|ok-loading|Whether the ok button is in the loading state|`boolean`|`false`|
|width|The width of the drawer (only available when placement is right, left)|`number`|`250`|
|height|The height of the drawer (only available when placement is top, bottom)|`number`|`250`|
|popup-container|Mount container for popup|`string \| HTMLElement \| null \| undefined`|`'body'`|
|drawer-style|Drawer style|`CSSProperties`|`-`|
|footer | Whether to display the bottom content|`boolean`|`true`|
### `<drawer>` Events

|Event Name|Description|Parameters|
|---|---|---|
|ok|Triggered when the OK button is clicked|-|
|cancel|Triggered when the cancel or close button is clicked|-|
|open|Triggered after the drawer is opened (the animation ends)|-|
|close|Triggered when the drawer is closed (the animation ends)|-|
### `<drawer>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|title|Title|-|
|footer|Footer|-|


