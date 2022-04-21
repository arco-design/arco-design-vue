```yaml
meta:
  type: Component
  category: Layout
title: Layout
description: The basic layout framework of the page is often used nested with components to construct the overall layout of the page.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/custom-icon.md

@import ./__demo__/collapsed.md

@import ./__demo__/breakpoint.md

@import ./__demo__/resize.md

## API


### `<layout>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|has-sider|Indicates that there is a Sider in the sub-element, which generally does not need to be specified. Used to avoid style flicker when rendering on the server side.|`boolean`|`false`|




### `<layout-header>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|default|Content|-|




### `<layout-content>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|default|Content|-|




### `<layout-footer>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|default|Content|-|




### `<layout-sider>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|theme|Theme|`'dark' \| 'light'`|`'light'`|
|collapsed|Current collapsed state|`boolean`|`-`|
|default-collapsed|The default collapsed state|`boolean`|`false`|
|collapsible|Whether is collapsible|`boolean`|`false`|
|width|Width|`number`|`200`|
|collapsed-width|Collapsed width|`number`|`48`|
|reverse-arrow|Flip and fold the direction of the hint arrow, which can be used when Sider is on the right|`boolean`|`false`|
|breakpoint|Trigger breakpoints for responsive layout, see [Responsive Grid](/vue/component/grid) for details|`'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'`|`-`|
|resize-directions|Can replace the native `aside` tag with ResizeBox. This is the `directions` parameter of ResizeBox. For details, please see [ResizeBox](/vue/component/resize-box)|`Array<'left' \| 'right' \| 'top' \| 'bottom'>`|`-`|
|hide-trigger|Whether to hide the bottom fold trigger|`boolean`|`false`|
### `<layout-sider>` Events

|Event Name|Description|Parameters|
|---|---|---|
|collapse|Events on expand/collapse. There are two ways to trigger click trigger and responsive feedback|collapsed: `boolean`<br>type: `'clickTrigger'\|'responsive'`|
|breakpoint|Events when a responsive layout breakpoint is triggered|collapsed: `boolean`|
### `<layout-sider>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|trigger|Custom bottom folding trigger|collapsed: `boolean`|


