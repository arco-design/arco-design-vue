```yaml
meta:
  type: Component
  category: Other
title: Trigger
description: Used to add hover, click, focus and other events to the element, and pop up a dropdown.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/nest.md

@import ./__demo__/triggers.md

@import ./__demo__/align-point.md

@import ./__demo__/scroll.md

@import ./__demo__/arrow.md

@import ./__demo__/translate.md

## API


### `<trigger>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|popup-visible **(v-model)**|Whether the popup is visible|`boolean`|`-`|
|default-popup-visible|Whether the popup is visible by default (uncontrolled mode)|`boolean`|`false`|
|trigger|Trigger method|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'hover'`|
|position|Popup position|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'bottom'`|
|disabled|Whether the trigger is disabled|`boolean`|`false`|
|popup-offset|The offset of the popup (the offset distance of the popup from the trigger)|`number`|`0`|
|popup-translate|The moving distance of the popup|`TriggerPopupTranslate`|`-`|
|show-arrow|Whether the popup shows an arrow|`boolean`|`false`|
|align-point|Whether the popup follows the mouse|`boolean`|`false`|
|popup-hover-stay|Whether to keep the popup displayed when the trigger is moved out and moved into the popup|`boolean`|`true`|
|blur-to-close|Whether to close the popup when the trigger loses focus|`boolean`|`true`|
|click-to-close|Whether to close the popup when the trigger is clicked|`boolean`|`true`|
|click-outside-to-close|Whether to close the popup when clicking on the outer area|`boolean`|`true`|
|unmount-on-close|Whether to uninstall the popup node when closing|`boolean`|`true`|
|content-class|The class name of the popup content|`string\|array\|object`|`-`|
|content-style|The style of the popup content|`CSSProperties`|`-`|
|arrow-class|The class name of the popup arrow|`string\|array\|object`|`-`|
|arrow-style|The style of the popup arrow|`CSSProperties`|`-`|
|popup-style|The style of the popup|`CSSProperties`|`-`|
|animation-name|The name of the popup animation|`string`|`'fade-in'`|
|duration|The duration of the popup animation|`number\| {    enter: number;    leave: number;  }`|`-`|
|mouse-enter-delay|Delay trigger time of mouseenter event (ms)|`number`|`100`|
|mouse-leave-delay|Delay trigger time of mouseleave event (ms)|`number`|`100`|
|focus-delay|Delay trigger time of focus event (ms)|`number`|`0`|
|auto-fit-popup-width|Whether to set the width of the popup to the width of the trigger|`boolean`|`false`|
|auto-fit-popup-min-width|Whether to set the minimum width of the popup to the trigger width|`boolean`|`false`|
|auto-fix-position|When the size of the trigger changes, whether to recalculate the position of the popup|`boolean`|`true`|
|popup-container|Mount container for popup|`string \| HTMLElement`|`-`|
|auto-fit-position|Whether to automatically adjust the position of the popup to fit the window size|`boolean`|`true`|
|render-to-body|Whether to mount under the `body` element|`boolean`|`true`|
|prevent-focus|Whether to prevent elements in the pop-up layer from gaining focus when clicked|`boolean`|`false`|
### `<trigger>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|popup-visible-change|Emitted when the status of the popup changes|visible: `boolean`||
|show|Triggered after the trigger is shown (the animation ends)|-|2.18.0|
|hide|Triggered after the popup is hidden (the animation ends)|-|2.18.0|
### `<trigger>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|content|Popup content|-|



## Type

```ts
type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };
```
