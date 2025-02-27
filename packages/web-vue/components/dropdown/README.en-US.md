```yaml
meta:
  type: Component
  category: Navigation
title: Dropdown
description: When there are too many commands on the page, the alternative commands can be stored in the floating container that expands downward.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/position.md

@import ./__demo__/trigger.md

@import ./__demo__/button.md

@import ./__demo__/group.md

@import ./__demo__/submenu.md

@import ./__demo__/context-menu.md

@import ./__demo__/icon.md

`<dropdown>` 组件继承 `<trigger>` 组件的全部属性

## API


### `<dropdown>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|popup-visible **(v-model)**|Whether the popup is visible|`boolean`|`-`||
|default-popup-visible|Whether the popup is visible by default (uncontrolled mode)|`boolean`|`false`||
|trigger|Trigger method|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`||
|position|Popup position|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'bottom'`||
|popup-container|Mount container for popup|`string \| HTMLElement`|`-`||
|popup-max-height|Maximum height of the popup|`boolean\|number`|`true`|2.29.0|
|hide-on-select|Whether to hide popup when the user selects|`boolean`|`true`|2.43.0|
### `<dropdown>` Events

|Event Name|Description|Parameters|
|---|---|---|
|popup-visible-change|Triggered when the display status of the drop-down box changes|visible: `boolean`|
|select|Triggered when the user selects|value: `string \| number \| Record<string, any> \| undefined `<br>ev: `Event`|
### `<dropdown>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|content|Content|-||
|footer|Footer|-|2.10.0|




### `<doption>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|value|Value|`string\|number\|object`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
### `<doption>` Events

|Event Name|Description|Parameters|
|---|---|---|
|click|Emitted when the button is clicked|ev: `MouseEvent`|
### `<doption>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|icon|Icon|-|




### `<dgroup>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|title|Group title|`string`|`-`|
### `<dgroup>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|title|Group title|-|2.10.0|




### `<dsubmenu>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|value|Value (Not useful after version 2.16.0)|`string\|number`|`-`||
|disabled|Whether to disable|`boolean`|`false`|2.10.0|
|trigger|Trigger method|`'hover' \| 'click'`|`'click'`|2.10.0|
|position|Popup position|`'rt' \| 'lt'`|`'rt'`|2.10.0|
|popup-visible **(v-model)**|Whether the popup is visible|`boolean`|`-`||
|default-popup-visible|Whether the popup is visible by default (uncontrolled mode)|`boolean`|`false`||
|option-props|Custom option properties|`object`|`-`|2.29.0|
### `<dsubmenu>` Events

|Event Name|Description|Parameters|
|---|---|---|
|popup-visible-change|Triggered when the display status of the drop-down box changes|visible: `boolean`|
### `<dsubmenu>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|icon|Icon|-|2.29.0|
|content|Submenu content|-||
|footer|Footer|-|2.10.0|




### `<dropdown-button>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|popup-visible **(v-model)**|Whether the popup is visible|`boolean`|`-`|
|default-popup-visible|Whether the popup is visible by default (uncontrolled mode)|`boolean`|`false`|
|trigger|Trigger method|`'hover' \| 'click' \| 'focus' \| 'contextMenu'`|`'click'`|
|position|Popup position|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`'br'`|
|popup-container|Mount container for popup|`string \| HTMLElement`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|type|Button type|`string`|`-`|
|size|Button size|`string`|`-`|
|button-props|Button props|`ButtonProps`|`-`|
|hide-on-select|Whether to hide popup when the user selects|`boolean`|`true`|
### `<dropdown-button>` Events

|Event Name|Description|Parameters|
|---|---|---|
|popup-visible-change|Triggered when the display status of the drop-down box changes|visible: `boolean`|
|click|Emitted when the button is clicked|ev: `MouseEvent`|
|select|Triggered when the user selects|value: `string \| number \| Record<string, any> \| undefined`<br>ev: `Event`|
### `<dropdown-button>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|icon|Button icon|popupVisible: `boolean`|
|content|Content|-|


