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

@import ./__demo__/subtree.md

@import ./__demo__/lazy-load.md

@import ./__demo__/props.md

@import ./__demo__/sort.md

@import ./__demo__/filter.md

@import ./__demo__/scroll.md

@import ./__demo__/fixed.md

@import ./__demo__/span.md

@import ./__demo__/summary.md

@import ./__demo__/column-resize.md

@import ./__demo__/drag-row.md

@import ./__demo__/drag-handle.md

@import ./__demo__/group.md

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
|loading|Whether it is loading state|`boolean`|`false`||
|hide-header|Whether to hide the header|`boolean`|`false`||
|row-selection|Table row selector configuration|`TableRowSelection`|`-`||
|expandable|Expand row configuration of the table|`TableExpandable`|`-`||
|scroll|Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values. `2.20.0` version adds support for `minWidth`, `maxHeight`.|`{  x?: number \| string;  y?: number \| string;  minWidth?: number \| string;  maxHeight?: number \| string;}`|`-`||
|pagination|Pagination properties configuration|`boolean \| PaginationProps`|`true`||
|page-position|The position of the page selector|`'tl' \| 'top' \| tr' \| 'bl' \| 'bottom' \| 'br'`|`'br'`||
|indent-size|The indentation distance of the tree table|`number`|`16`||
|row-key|Value field of table row `key`|`string`|`'key'`||
|show-header|Whether to show the header|`boolean`|`true`||
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling|`VirtualListProps`|`-`||
|span-method|Cell merge method (The index starts counting from the data item)|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.10.0|
|span-all|Whether to make the index of the span method contain all|`boolean`|`false`|2.18.0|
|load-more|Data lazy loading function, open the lazy loading function when it is passed in|`(record: TableData, done: (children?: TableData[]) => void) => void`|`-`|2.13.0|
|filter-icon-align-left|Whether the filter icon is aligned to the left|`boolean`|`false`|2.13.0|
|hide-expand-button-on-empty|Whether to hide expand button when subtree is empty|`boolean`|`false`|2.14.0|
|row-class|The class name of the table row element|`string\|array\|object`|`-`|2.16.0|
|draggable|Table drag and drop sorting configuration|`TableDraggable`|`-`|2.16.0|
|column-resizable|Whether to allow the column width to be adjusted|`boolean`|`false`|2.16.0|
|summary|Show footer summary row|`boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])`|`-`|2.21.0|
|summary-text|The first column of text in the summary line|`string`|`'Summary'`|2.21.0|
|summary-span-method|Cell Merge Method for Summarizing Rows|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.21.0|
|selected-keys|Selected row (controlled mode) takes precedence over `rowSelection`|`string[]`|`-`|2.25.0|
|default-selected-keys|The selected row by default (uncontrolled mode) takes precedence over `rowSelection`|`string[]`|`-`|2.25.0|
|expanded-keys|Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`|`string[]`|`-`|2.25.0|
|default-expanded-keys|Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`|`string[]`|`-`|2.25.0|
|default-expand-all-rows|Whether to expand all rows by default|`boolean`|`false`|2.25.0|
### `<table>` Events

|Event Name|Description|Parameters|
|---|---|---|
|expand|Triggered when a row is clicked to expand|rowKey: `string`|
|expanded-change|Triggered when the expanded data row changes|rowKeys: `string[]`|
|select|Triggered when the row selector is clicked|rowKeys: `string[]`<br>rowKey: `string`|
|select-all|Triggered when the select all selector is clicked|checked: `boolean`|
|selection-change|Triggered when the selected data row changes|rowKeys: `string[]`|
|sorter-change|Triggered when the collation changes|dataIndex: `string`<br>direction: `string`|
|filter-change|Triggered when the filter options are changed|dataIndex: `string`<br>filteredValues: `string[]`|
|page-change|Triggered when the table pagination changes|page: `number`|
|page-size-change|Triggered when the number of data per page of the table changes|pageSize: `number`|
|change||data: `TableData[]`<br>extra: `TableChangeExtra`|
|cell-click|Triggered when a cell is clicked|record: `TableData`<br>column: `TableColumnData`|
|row-click|Triggered when row data is clicked|record: `TableData`|
|header-click|Triggered when the header data is clicked|column: `TableColumnData`|
### `<table>` Methods

|Method|Description|Parameters|Return|version|
|---|---|---|:---:|:---|
|selectAll|Set select all state|checked: ` boolean `|-|2.22.0|
### `<table>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|empty|Empty|-||
|summary-cell|Content on the right side of the pagination|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.23.0|
|pagination-right|Content on the right side of the pagination|-|2.18.0|
|pagination-left|Content on the left side of the pagination|-|2.18.0|
|td|Custom td element|-|2.16.0|
|tr|Custom tr element|-|2.16.0|
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
|cell-style|Custom cell style|`CSSProperties`|`-`|2.11.0|
|index|index for manually specifying option|`number`|`-`|2.20.2|
### `<table-column>` Slots

|Slot Name|Description|Parameters|version|
|---|---|---|:---|
|filter-icon|Title|-|2.23.0|
|filter-content|Title|filterValue: `string[]`<br>setFilterValue: `(filterValue: string[]) => void`<br>handleFilterConfirm: `(event: Event) => void`<br>handleFilterReset: `(event: Event) => void`|2.23.0|
|title|Title|-||
|cell|Cell|record: `TableData`<br>column: `TableColumnData`<br>rowIndex: `number`||




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
|renderContent|The content of filter box|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNode`|`-`||
|icon|Filter icon for button|`() => VNode`|`-`||
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
|sortable|Sorting related options|`TableSortable`|`-`||
|filterable|Filter related options|`TableFilterable`|`-`||
|children|Header sub-data, used for header grouping|`TableColumnData[]`|`-`||
|cellStyle|Custom cell style|`CSSProperties`|`-`|2.11.0|
|render|Customize the rendering of column cells|`(data: {    record: TableData;    column: TableColumnData;    rowIndex: number;  }) => VNode`|`-`||
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

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|The type of row selector|`'checkbox' \| 'radio'`|`-`|
|selectedRowKeys|Selected row (controlled mode)|`string[]`|`-`|
|defaultSelectedRowKeys|The selected row by default (uncontrolled mode)|`string[]`|`-`|
|showCheckedAll|Whether to show the select all selector|`boolean`|`false`|
|title|Column title|`string`|`-`|
|width|Column width|`number`|`-`|
|fixed|Is it fixed|`boolean`|`false`|



### TableExpandable

|Name|Description|Type|Default|
|---|---|---|:---:|
|expandedRowKeys|Displayed Expanded Row (Controlled Mode)|`string[]`|`-`|
|defaultExpandedRowKeys|Expand row displayed by default (Uncontrolled mode)|`string[]`|`-`|
|defaultExpandAllRows|Whether to expand all rows by default|`boolean`|`false`|
|expandedRowRender|Customize expanded row content|`(record: TableData) => VNode`|`-`|
|icon|Expand icon|`(expanded: boolean, record: TableData) => VNode`|`-`|
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



```ts
type Filters = Record<string, string[]>;

type Sorter = { filed: string; direction: 'ascend' | 'descend' } | Record<string, never>;
```
