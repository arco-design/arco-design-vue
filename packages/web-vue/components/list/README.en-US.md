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

@import ./__demo__/grid.md

@import ./__demo__/scroll.md

@import ./__demo__/virtual-list.md

## API


### `<list>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|data|List data, need to be used with `item` slot at the same time|`any[]`|`-`|
|size|List size|`'small' \| 'medium' \| 'large'`|`'medium'`|
|bordered|Whether to show the border|`boolean`|`true`|
|split|Whether to show the dividing line|`boolean`|`true`|
|loading|Whether it is loading state|`boolean`|`false`|
|hoverable|Whether to display the selected style|`boolean`|`false`|
|pagination-props|List pagination configuration|`PaginationProps`|`-`|
|grid-props|List grid configuration|`object`|`-`|
|max-height|Maximum height of the list|`number`|`0`|
|bottom-offset|Trigger the distance threshold to reach the bottom|`number`|`0`|
|virtual-list-props|Pass virtual list properties, pass in this parameter to turn on virtual scrolling [VirtualListProps](#virtuallistprops)|`VirtualListProps`|`-`|
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
|footer|Footer|-||
|header|Header|-||




### `<list-item>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|action-layout|Operation group arrangement direction|`string`|`'horizontal'`|
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

|Name|Description|Type|Default|
|---|---|---|:---:|
|height|Viewable area height|`number \| string`|`-`|
|threshold|Threshold for the number of elements that automatically turn on virtual scrolling, passing in null means that virtual scrolling is prohibited|`number \| null`|`-`|
|isStaticItemHeight|Is the element height fixed|`boolean`|`false`|


