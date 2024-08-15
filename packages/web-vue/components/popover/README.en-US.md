```yaml
meta:
  type: Component
  category: Data Display
title: Popover
description: When the mouse hovers, focus, or click on a component, a bubble-like card floating layer will pop up. You can manipulate the elements on the card.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/trigger.md

@import ./__demo__/position.md

`<popover>` 组件继承 `<trigger>` 组件的全部属性

## API


### `<popover>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|popup-visible **(v-model)**|Whether the popover is visible|`boolean`|`-`|
|default-popup-visible|Whether the popover is visible by default (uncontrolled mode)|`boolean`|`false`|
|title|Title|`string`|`-`|
|content|Content|`string`|`-`|
|trigger|Trigger method|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'hover'`|
|position|Pop-up position|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' \| 'left' \| 'lt' \| 'lb' \| 'right' \| 'rt' \| 'rb'`|`'top'`|
|content-class|The class name of the popup content|`ClassName`|`-`|
|content-style|The style of the popup content|`CSSProperties`|`-`|
|arrow-class|The class name of the popup arrow|`ClassName`|`-`|
|arrow-style|The style of the popup arrow|`CSSProperties`|`-`|
|popup-container|Mount container for pop-up box|`string \| HTMLElement`|`-`|
### `<popover>` Events

|Event Name|Description|Parameters|
|---|---|---|
|popup-visible-change|Triggered when the text bubble display status changes|visible: `boolean`|
### `<popover>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|title|Title|-|
|content|Content|-|


