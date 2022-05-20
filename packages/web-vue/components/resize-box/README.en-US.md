```yaml
meta:
  type: Component
  category: Other
title: ResizeBox
description: Telescopic frame components.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/controlled.md

@import ./__demo__/layout.md

@import ./__demo__/custom-triggers.md

## API


### `<resize-box>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|width **(v-model)**|Width|`number`|`-`|
|height **(v-model)**|Height|`number`|`-`|
|component|The html tag of the telescopic box|`string`|`'div'`|
|directions|Can be stretched side, there are up, down, left and right can be used|`('left' \| 'right' \| 'top' \| 'bottom')[]`|`['right']`|
### `<resize-box>` Events

|Event Name|Description|Parameters|
|---|---|---|
|moving-start|Triggered when dragging starts|ev: `MouseEvent`|
|moving|Triggered when dragging|size: `{ width: number; height: number; }`<br>ev: `MouseEvent`|
|moving-end|Triggered when the drag ends|ev: `MouseEvent`|
### `<resize-box>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|resize-trigger|The contents of the resize pole|direction: `'left' \| 'right' \| 'top' \| 'bottom'`|
|resize-trigger-icon|Resize pole icon|direction: `'left' \| 'right' \| 'top' \| 'bottom'`|


