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

@import ./__demo__/popup-container.md


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
|width|The width of the drawer (only available when placement is right, left)|`number\|string`|`250`|
|height|The height of the drawer (only available when placement is top, bottom)|`number\|string`|`250`|
|popup-container|Mount container for popup|`string \| HTMLElement \| null \| undefined`|`'body'`|
|drawer-style|Drawer style|`CSSProperties`|`-`|
|on-before-ok|The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.|`(done: (closed: boolean) => void) => void \| boolean`|`-`|
|on-before-cancel|The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.|`() => boolean`|`-`|
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


