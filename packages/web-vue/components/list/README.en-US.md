```yaml
meta:
  type: Component
  category: Data Display
title: List
description: The most basic list display, which can carry text, lists, pictures, and paragraphs, and is often used in the background data display page.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/size.md

@import ./__demo__/meta.md

@import ./__demo__/actions.md

@import ./__demo__/actions-layout.md

@import ./__demo__/grid.md

@import ./__demo__/responsive-grid.md

@import ./__demo__/scroll.md

@import ./__demo__/virtual-list.md

## API


### `<list>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|data|List data, need to be used with `item` slot at the same time|`any[]`|`-`||
|size|List size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|bordered|Whether to show the border|`boolean`|`true`||
|split|Whether to show the dividing line|`boolean`|`true`||
|loading|Whether it is loading state|`boolean`|`false`||
|hoverable|Whether to display the selected style|`boolean`|`false`||
|pagination-props|List pagination configuration|`PaginationProps`|`-`||
|grid-props|List grid configuration|`object`|`-`||
|max-height|Maximum height of the list|`string \| number`|`0`||
|bottom-offset|Trigger the distance threshold to reach the bottom|`number`|`0`||
|virtual-list-props|Pass virtual list properties, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|scrollbar|Whether to enable virtual scroll bar|`boolean \| ScrollbarProps`|`true`|2.38.0|
### `<list>` Events

|Event Name|Description|Parameters|
|---|---|---|
|scroll|Triggered when the list scrolls|-|
|reach-bottom|Triggered when the list reaches the bottom|-|
|page-change|Triggered when the table pagination changes|page: `number`|
|page-size-change|Triggered when the number of data per page of the table changes|pageSize: `number`|
### `<list>` Methods

|Method|Description|Parameters|Return|
|---|---|---|:---:|
|scrollIntoView|Virtual scroll to an element|options: `{ index?: number; key?: number \| string; align: 'auto' \| 'top' \| 'bottom'}`|-|
### `<list>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|scroll-loading|When scrolling loading state, scroll to the bottom tip|-|2.20.0|
|item|List Item|index: `number`<br>item: `any`||
|empty|Empty|-||
|footer|Footer|-||
|header|Header|-||




### `<list-item>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|action-layout|Operation group arrangement direction|`Direction`|`'horizontal'`|
### `<list-item>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|meta|Meta data|-|
|extra|Extra content|-|
|actions|Actions|-|




### `<list-item-meta>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|title|Title|`string`|`-`|
|description|Description|`string`|`-`|
### `<list-item-meta>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|avatar|Avatar|-|
|title|Title|-|
|description|Description|-|




### VirtualListProps

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|height|Viewable area height|`number \| string`|`-`||
|threshold|The threshold of the number of elements to enable virtual scrolling. When the number of data is less than the threshold, virtual scrolling will not be enabled.|`number`|`-`||
|isStaticItemHeight|(Repealed) Is the element height fixed. Version 2.18.0 deprecated, please use `fixedSize`|`boolean`|`false`||
|fixedSize|Is the element height fixed.|`boolean`|`false`|2.34.1|
|estimatedSize|Is the element height fixed.|`number`|`-`|2.34.1|
|buffer|The number of elements mounted in advance outside the boundary of the viewport.|`number`|`10`|2.34.1|


