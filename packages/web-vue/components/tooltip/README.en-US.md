```yaml
meta:
  type: Component
  category: Data Display
title: Tooltip
description: A tooltip that popup when the mouse hovers, focus, or click on a component.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/mini.md

@import ./__demo__/position.md

@import ./__demo__/color.md

`<tooltip>` 组件继承 `<trigger>` 组件的全部属性

## API


### `<tooltip>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|popup-visible **(v-model)**|Whether the tooltip is visible|`boolean`|`-`|
|default-popup-visible|Whether the tooltip is visible by default (uncontrolled mode)|`boolean`|`false`|
|content|Tooltip content|`string`|`-`|
|position|Popup position|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|mini|Whether to display as a mini size|`boolean`|`false`|
|background-color|Background color of the popover|`string`|`-`|
|content-class|The class name of the popup content|`ClassName`|`-`|
|content-style|The style of the popup content|`CSSProperties`|`-`|
|arrow-class|The class name of the popup arrow|`ClassName`|`-`|
|arrow-style|The style of the popup arrow|`CSSProperties`|`-`|
|popup-container|Mount container for popup|`string \| HTMLElement`|`-`|
### `<tooltip>` Events

|Event Name|Description|Parameters|
|---|---|---|
|popup-visible-change|Emitted when the tooltip display status changes|visible: `boolean`|
### `<tooltip>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|content|Content|-|


