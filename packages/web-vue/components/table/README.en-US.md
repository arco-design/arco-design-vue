```yaml
meta:
  type: Component
  category: Data Display
title: Table
description: It is used for data collection, display, analysis and processing, and operation and processing.
```

*Auto translate by google.*

@import ./__demo__/basic.md

@import ./__demo__/row-selection.md

@import ./__demo__/radio.md

@import ./__demo__/expand.md

@import ./__demo__/ellipsis.md

@import ./__demo__/subtree.md

@import ./__demo__/lazy-load.md

@import ./__demo__/props.md

@import ./__demo__/sort.md

@import ./__demo__/filter.md

@import ./__demo__/scroll.md

@import ./__demo__/fixed.md

@import ./__demo__/span.md

@import ./__demo__/sticky.md

@import ./__demo__/summary.md

@import ./__demo__/resize.md

@import ./__demo__/drag-row.md

@import ./__demo__/drag-handle.md

@import ./__demo__/group.md

@import ./__demo__/fixed-group.md

@import ./__demo__/editable.md

@import ./__demo__/custom.md

@import ./__demo__/custom-dom.md

@import ./__demo__/virtual-list.md

## API


### `<table>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|columns|Column info of the table|`TableColumnData[]`|`[]`||
|data|Table data|`TableData[]`|`[]`||
|bordered|Whether to show the border|`boolean \| TableBorder`|`true`||
|hoverable|Whether to show the hover effect|`boolean`|`true`||
|stripe|Whether to enable the stripe effect|`boolean`|`false`||
|size|The size of the table|`'mini' \| 'small' \| 'medium' \| 'large'`|`'large'`||
|table-layout-fixed|The table-layout property of the table is set to fixed. After it is set to fixed, the width of the table will not be stretched beyond 100% by the content.|`boolean`|`false`||
|loading|Whether it is loading state|`boolean\|object`|`false`||
|row-selection|Table row selector configuration|`TableRowSelection`|`-`||
|expandable|Expand row configuration of the table|`TableExpandable`|`-`||
|scroll|Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values. `2.20.0` version adds support for `minWidth`, `maxHeight`.|`{  x?: number \| string;  y?: number \| string;  minWidth?: number \| string;  maxHeight?: number \| string;}`|`-`||
|pagination|Pagination properties configuration|`boolean \| PaginationProps`|`true`||
|page-position|The position of the page selector|`'tl' \| 'top' \| tr' \| 'bl' \| 'bottom' \| 'br'`|`'br'`||
|indent-size|The indentation distance of the tree table|`number`|`16`||
|row-key|Value field of table row `key`|`string`|`'key'`||
|show-header|Whether to show the header|`boolean`|`true`||
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|span-method|Cell merge method (The index starts counting from the data item)|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.10.0|
|span-all|Whether to make the index of the span method contain all|`boolean`|`false`|2.18.0|
|load-more|Data lazy loading function, open the lazy loading function when it is passed in|`(record: TableData, done: (children?: TableData[]) => void) => void`|`-`|2.13.0|
|filter-icon-align-left|Whether the filter icon is aligned to the left|`boolean`|`false`|2.13.0|
|hide-expand-button-on-empty|Whether to hide expand button when subtree is empty|`boolean`|`false`|2.14.0|
|row-class|The class name of the table row element. The `2.34.0` version adds support for function values.|`string\| any[]\| Record<string, any>\| ((record: TableData, rowIndex: number) => any)`|`-`|2.16.0|
|draggable|Table drag and drop sorting configuration|`TableDraggable`|`-`|2.16.0|
|column-resizable|Whether to allow the column width to be adjusted|`boolean`|`false`|2.16.0|
|summary|Show footer summary row|`boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])`|`-`|2.21.0|
|summary-text|The first column of text in the summary line|`string`|`'Summary'`|2.21.0|
|summary-span-method|Cell Merge Method for Summarizing Rows|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.21.0|
|selected-keys|Selected row (controlled mode) takes precedence over `rowSelection`|`(string \| number)[]`|`-`|2.25.0|
|default-selected-keys|The selected row by default (uncontrolled mode) takes precedence over `rowSelection`|`(string \| number)[]`|`-`|2.25.0|
|expanded-keys|Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`|`(string \| number)[]`|`-`|2.25.0|
|default-expanded-keys|Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`|`(string \| number)[]`|`-`|2.25.0|
|default-expand-all-rows|Whether to expand all rows by default|`boolean`|`false`|2.25.0|
|sticky-header|Whether to open the sticky header|`boolean\|number`|`false`|2.30.0|
|scrollbar|Whether to enable virtual scroll bar|`boolean \| ScrollbarProps`|`true`|2.38.0|
### `<table>` Events

|Event Name|Description|Parameters|version|
|---|---|---|:---|
|expand|Triggered when a row is clicked to expand|rowKey: `string \| number`<br>record: `TableData`||
|expanded-change|Triggered when the expanded data row changes|rowKeys: `(string \| number)[]`||
|select|Triggered when the row selector is clicked|rowKeys: `string \| number[]`<br>rowKey: `string \| number`<br>record: `TableData`||
|select-all|Triggered when the select all selector is clicked|checked: `boolean`||
|selection-change|Triggered when the selected data row changes|rowKeys: `(string \| number)[]`||
|sorter-change|Triggered when the collation changes|dataIndex: `string`<br>direction: `string`||
|filter-change|Triggered when the filter options are changed|dataIndex: `string`<br>filteredValues: `string[]`||
|page-change|Triggered when the table pagination changes|page: `number`||
|page-size-change|Triggered when the number of data per page of the table changes|pageSize: `number`||
|change|Triggered when table data changes|data: `TableData[]`<br>extra: `TableChangeExtra`<br>currentData: `TableData[]`|2.40.0 增加 currentData|
|cell-mouse-enter|Triggered when hovering into a cell|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|cell-mouse-leave|Triggered when hovering out of a cell|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|cell-click|Triggered when a cell is clicked|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|row-click|Triggered when row data is clicked|record: `TableData`<br>ev: `Event`||
|header-click|Triggered when the header data is clicked|column: `TableColumnData`<br>ev: `Event`||
|column-resize|Triggered when column width is adjusted|dataIndex: `string`<br>width: `number`|2.28.0|
|row-dblclick|Triggered when row data is double clicked|record: `TableData`<br>ev: `Event`||
|cell-dblclick|Triggered when a cell is double clicked|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|row-contextmenu|Triggered when row data is right clicked|record: `TableData`<br>ev: `Event`||
|cell-contextmenu|Triggered when a cell is right clicked|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
### `<table>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|selectAll|Set select all state|checked: ` boolean `|-|2.22.0|
|select|Set row selector state|rowKey: ` string \| number \| (string \| number)[] `<br>checked: ` boolean `|-|2.31.0|
|expandAll|Set all expanded state|checked: ` boolean `|-|2.31.0|
|expand|Set select all state|rowKey: ` string \| number \| (string \| number)[] `<br>checked: ` boolean `|-|2.31.0|
|resetFilters|Reset the filter for columns|dataIndex: ` string \| string[] `|-|2.31.0|
|clearFilters|Clear the filter for columns|dataIndex: ` string \| string[] `|-|2.31.0|
|resetSorters|Reset the order of columns|-|-|2.31.0|
|clearSorters|Clear the order of columns|-|-|2.31.0|
### `<table>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|th|Custom th element|column: `TableColumnData`|2.26.0|
|thead|Custom thead element|-|2.26.0|
|empty|Empty|-||
|summary-cell|Content on the right side of the pagination|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.23.0|
|pagination-right|Content on the right side of the pagination|-|2.18.0|
|pagination-left|Content on the left side of the pagination|-|2.18.0|
|td|Custom td element|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.16.0|
|tr|Custom tr element|record: `TableData`<br>rowIndex: `number`|2.16.0|
|tbody|Custom tbody element|-|2.16.0|
|drag-handle-icon|Drag handle icon|-|2.16.0|
|footer|Table Footer|-||
|expand-row|Expand row content|record: `TableData`||
|expand-icon|Expand row icon|expanded: `boolean`<br>record: `TableData`||
|columns|Table column definitions. When enabled, the columns attribute is masked|-||




### `<table-column>` Props

|Attribute|Description|Type|Default|version|
|---|---|---|:---:|:---|
|data-index|Identifies the column information, corresponding to the data in TableData|`string`|`-`||
|title|Column title|`string`|`-`||
|width|Column width|`number`|`-`||
|align|Alignment direction|`TableColumnData['align']`|`-`||
|fixed|Fixed position|`TableColumnData['fixed']`|`-`||
|ellipsis|Whether to display as omitted|`boolean`|`false`||
|sortable|Sorting related options|`TableSortable`|`-`||
|filterable|Filter related options|`TableFilterable`|`-`||
|cell-class|Custom cell class|`ClassName`|`-`|2.36.0|
|header-cell-class|Custom cell class|`ClassName`|`-`|2.36.0|
|body-cell-class|Custom cell class|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|summary-cell-class|Customize summary column cell class|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|cell-style|Custom cell style|`CSSProperties`|`-`|2.11.0|
|header-cell-style|Custom cell style|`CSSProperties`|`-`|2.29.0|
|body-cell-style|Custom cell style|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.29.0|
|summary-cell-style|Customize summary column cell style|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.30.0|
|index|index for manually specifying option. Manual specification is no longer required after version 2.26.0|`number`|`-`|2.20.2|
|tooltip|Whether to show text hints when omitted|`boolean\|object`|`false`|2.26.0|
### `<table-column>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|filter-icon|Title|-|2.23.0|
|filter-content|Title|filterValue: `string[]`<br>setFilterValue: `(filterValue: string[]) => void`<br>handleFilterConfirm: `(event: Event) => void`<br>handleFilterReset: `(event: Event) => void`|2.23.0|
|title|Title|-||
|cell|Cell|record: `TableData`<br>column: `TableColumnData`<br>rowIndex: `number`||



## Type

```ts
type Filters = Record<string, string[]>;

type Sorter = { filed: string; direction: 'ascend' | 'descend' } | Record<string, never>;
```


### TableData

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|key|The key of the data row|`string`|`-`||
|expand|Expand row content|`string \| RenderFunction`|`-`||
|children|Sub data|`TableData[]`|`-`||
|disabled|Whether to disable the row selector|`boolean`|`false`||
|isLeaf|Whether it is a leaf node|`boolean`|`false`|2.13.0|



### TableSortable

|Name|Description|Type|Default|
|---|---|---|:---:|
|sortDirections|Supported sort direction|`('ascend' \| 'descend')[]`|`-`|
|sorter|Sorting function. Set to `true` to turn off internal sorting. Version 2.19.0 modifies outgoing data.|`((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean`|`-`|
|sortOrder|Sort direction|`'ascend' \| 'descend' \| ''`|`-`|
|defaultSortOrder|Default sort direction (uncontrolled mode)|`'ascend' \| 'descend' \| ''`|`-`|



### TableFilterData

|Name|Description|Type|Default|
|---|---|---|:---:|
|text|Filter the content of the data option|`string \| RenderFunction`|`-`|
|value|Filter the value of the data option|`string`|`-`|



### TableFilterable

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|filters|Filter data|`TableFilterData[]`|`-`||
|filter|Filter function|`(filteredValue: string[], record: TableData) => boolean`|`-`||
|multiple|Whether to support multiple selection|`boolean`|`false`||
|filteredValue|Filter value|`string[]`|`-`||
|defaultFilteredValue|Default filter value|`string[]`|`-`||
|renderContent|The content of filter box|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild`|`-`||
|icon|Filter icon for button|`RenderFunction`|`-`||
|triggerProps|Pop-up box configuration of filter box|`TriggerProps`|`-`||
|alignLeft|Whether the filter icon is aligned to the left|`boolean`|`false`|2.13.0|



### TableColumnData

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|dataIndex|The identifier of the column information, corresponding to the data in `TableData`|`string`|`-`||
|title|Column header|`string \| RenderFunction`|`-`||
|width|Column width|`number`|`-`||
|align|Alignment direction|`'left' \| 'center' \| 'right'`|`-`||
|fixed|Fixed position|`'left' \| 'right'`|`-`||
|ellipsis|Whether to show ellipsis|`boolean`|`false`||
|tooltip|Whether to show a text hint when an ellipsis is displayed. Can be filled in tooltip component properties|`boolean \| Record<string, any>`|`-`|2.26.0|
|sortable|Sorting related options|`TableSortable`|`-`||
|filterable|Filter related options|`TableFilterable`|`-`||
|children|Header sub-data, used for header grouping|`TableColumnData[]`|`-`||
|cellClass|Custom cell class|`ClassName`|`-`|2.36.0|
|headerCellClass|Custom header cell class|`ClassName`|`-`|2.36.0|
|bodyCellClass|Custom body cell class|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|summaryCellClass|Custom body cell class|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|cellStyle|Custom cell style|`CSSProperties`|`-`|2.11.0|
|headerCellStyle|Custom header cell style|`CSSProperties`|`-`|2.29.0|
|bodyCellStyle|Custom body cell style|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.29.0|
|summaryCellStyle|Custom summary cell style|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.30.0|
|render|Customize the rendering of column cells|`(data: {    record: TableData;    column: TableColumnData;    rowIndex: number;  }) => VNodeChild`|`-`||
|slotName|Sets the name of the render slot for the current column. Slot parameters are the same as #cell|`string`|`-`|2.18.0|
|titleSlotName|Set the name of the render slot for the header of the current column|`string`|`-`|2.23.0|



### TableBorder

|Name|Description|Type|Default|
|---|---|---|:---:|
|wrapper|TWhether to display the outer border|`boolean`|`false`|
|cell|Whether to display the cell border (header + body)|`boolean`|`false`|
|headerCell|Whether to display the header cell border|`boolean`|`false`|
|bodyCell|Whether to display the body cell border|`boolean`|`false`|



### TableRowSelection

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|type|The type of row selector|`'checkbox' \| 'radio'`|`-`||
|selectedRowKeys|Selected row (controlled mode)|`BaseType[]`|`-`||
|defaultSelectedRowKeys|The selected row by default (uncontrolled mode)|`BaseType[]`|`-`||
|showCheckedAll|Whether to show the select all selector|`boolean`|`false`||
|title|Column title|`string`|`-`||
|width|Column width|`number`|`-`||
|fixed|Is it fixed|`boolean`|`false`||
|checkStrictly|Whether to enable strict selection mode|`boolean`|`true`|2.29.0|
|onlyCurrent|Whether to display only the keys of the current page (clear keys when switching paging)|`boolean`|`false`|2.32.0|



### TableExpandable

|Name|Description|Type|Default|
|---|---|---|:---:|
|expandedRowKeys|Displayed Expanded Row (Controlled Mode)|`BaseType[]`|`-`|
|defaultExpandedRowKeys|Expand row displayed by default (Uncontrolled mode)|`BaseType[]`|`-`|
|defaultExpandAllRows|Whether to expand all rows by default|`boolean`|`false`|
|expandedRowRender|Customize expanded row content|`(record: TableData) => VNodeChild`|`-`|
|icon|Expand icon|`(expanded: boolean, record: TableData) => VNodeChild`|`-`|
|title|Column title|`string`|`-`|
|width|Column width|`number`|`-`|
|fixed|Is it fixed|`boolean`|`false`|



### TableDraggable

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|drag type|`'row' \| 'handle'`|`-`|
|title|Column title|`string`|`-`|
|width|Column width|`number`|`-`|
|fixed|Is it fixed|`boolean`|`false`|



### TableChangeExtra

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|Trigger type|`'pagination' \| 'sorter' \| 'filter' \| 'drag'`|`-`|
|page|page number|`number`|`-`|
|pageSize|number per page|`number`|`-`|
|sorter|Sort information|`Sorter`|`-`|
|filters|Filter information|`Filters`|`-`|
|dragTarget|Drag and drop information|`TableData`|`-`|




### VirtualListProps

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|height|Viewable area height|`number \| string`|`-`||
|threshold|The threshold of the number of elements to enable virtual scrolling. When the number of data is less than the threshold, virtual scrolling will not be enabled.|`number`|`-`||
|isStaticItemHeight|(Repealed) Is the element height fixed. Version 2.18.0 deprecated, please use `fixedSize`|`boolean`|`false`||
|fixedSize|Is the element height fixed.|`boolean`|`false`|2.34.1|
|estimatedSize|Is the element height fixed.|`number`|`-`|2.34.1|
|buffer|The number of elements mounted in advance outside the boundary of the viewport.|`number`|`10`|2.34.1|



## FAQ

The table component provides custom slots for internal elements, which are different from normal slots and have certain restrictions on what the user can pass in.
Because the slot of vue does not provide a way to send out children and render them in the slot, we have done some special processing for the element slot in the table, and will append the original children to the content passed in by the user to ensure that children Normal rendering of the element.
At this point, the user needs to pay attention that when custom rendering in the element slot, a single empty element needs to be passed in, and content cannot be added to the passed in element (refer to Example 1).
If the user needs to pass in a composite element, he can customize the component, specify the default slot, and then pass it into the element slot of the table (refer to Example 2).

example 1:
```vue
<!-- Only one element -->
<template>
  <a-table>
    <template #td>
      <td @click="onClick"></td>
    </template>
  </a-table>
</template>
```
example 2：
```vue
<!-- Only one component -->
<template>
  <a-table>
    <template #td>
      <MyTd></MyTd>
    </template>
  </a-table>
</template>
```
```vue
<!-- MyTd.vue -->
<template>
  <td>
    <div>my td content</div>
    <div>
      <slot/>
    </div>
  </td>
</template>
```
