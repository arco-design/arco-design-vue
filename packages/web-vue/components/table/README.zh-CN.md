```yaml
meta:
  type: 组件
  category: 数据展示
title: 表格 Table
description: 用于数据收集展示、分析整理、操作处理。
```

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

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|columns|表格的列描述信息|`TableColumnData[]`|`[]`||
|data|表格的数据|`TableData[]`|`[]`||
|bordered|是否显示边框|`boolean \| TableBorder`|`true`||
|hoverable|是否显示选中效果|`boolean`|`true`||
|stripe|是否开启斑马纹效果|`boolean`|`false`||
|size|表格的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'large'`||
|table-layout-fixed|表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。|`boolean`|`false`||
|loading|是否为加载中状态|`boolean\|object`|`false`||
|row-selection|表格的行选择器配置|`TableRowSelection`|`-`||
|expandable|表格的展开行配置|`TableExpandable`|`-`||
|scroll|表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。|`{  x?: number \| string;  y?: number \| string;  minWidth?: number \| string;  maxHeight?: number \| string;}`|`-`||
|pagination|分页的属性配置|`boolean \| PaginationProps`|`true`||
|page-position|分页选择器的位置|`'tl' \| 'top' \| tr' \| 'bl' \| 'bottom' \| 'br'`|`'br'`||
|indent-size|树形表格的缩进距离|`number`|`16`||
|row-key|表格行 `key` 的取值字段|`string`|`'key'`||
|show-header|是否显示表头|`boolean`|`true`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`||
|span-method|单元格合并方法（索引从数据项开始计数）|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.10.0|
|span-all|是否让合并方法的索引包含所有|`boolean`|`false`|2.18.0|
|load-more|数据懒加载函数，传入时开启懒加载功能|`(record: TableData, done: (children?: TableData[]) => void) => void`|`-`|2.13.0|
|filter-icon-align-left|筛选图标是否左对齐|`boolean`|`false`|2.13.0|
|hide-expand-button-on-empty|是否在子树为空时隐藏展开按钮|`boolean`|`false`|2.14.0|
|row-class|表格行元素的类名。`2.34.0` 版本增加函数值支持|`string\| any[]\| Record<string, any>\| ((record: TableData, rowIndex: number) => any)`|`-`|2.16.0|
|draggable|表格拖拽排序的配置|`TableDraggable`|`-`|2.16.0|
|column-resizable|是否允许调整列宽|`boolean`|`false`|2.16.0|
|summary|显示表尾总结行|`boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])`|`-`|2.21.0|
|summary-text|总结行的首列文字|`string`|`'Summary'`|2.21.0|
|summary-span-method|总结行的单元格合并方法|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.21.0|
|selected-keys|已选择的行（受控模式）优先于 `rowSelection`|`(string \| number)[]`|`-`|2.25.0|
|default-selected-keys|默认已选择的行（非受控模式）优先于 `rowSelection`|`(string \| number)[]`|`-`|2.25.0|
|expanded-keys|显示的展开行、子树（受控模式）优先于 `expandable`|`(string \| number)[]`|`-`|2.25.0|
|default-expanded-keys|默认显示的展开行、子树（非受控模式）优先于 `expandable`|`(string \| number)[]`|`-`|2.25.0|
|default-expand-all-rows|是否默认展开所有的行|`boolean`|`false`|2.25.0|
|sticky-header|是否开启表头吸顶|`boolean\|number`|`false`|2.30.0|
|scrollbar|是否开启虚拟滚动条|`boolean \| ScrollbarProps`|`true`|2.38.0|
### `<table>` Events

|事件名|描述|参数|版本|
|---|---|---|:---|
|expand|点击展开行时触发|rowKey: `string \| number`<br>record: `TableData`||
|expanded-change|已展开的数据行发生改变时触发|rowKeys: `(string \| number)[]`||
|select|点击行选择器时触发|rowKeys: `string \| number[]`<br>rowKey: `string \| number`<br>record: `TableData`||
|select-all|点击全选选择器时触发|checked: `boolean`||
|selection-change|已选择的数据行发生改变时触发|rowKeys: `(string \| number)[]`||
|sorter-change|排序规则发生改变时触发|dataIndex: `string`<br>direction: `string`||
|filter-change|过滤选项发生改变时触发|dataIndex: `string`<br>filteredValues: `string[]`||
|page-change|表格分页发生改变时触发|page: `number`||
|page-size-change|表格每页数据数量发生改变时触发|pageSize: `number`||
|change|表格数据发生变化时触发|data: `TableData[]`<br>extra: `TableChangeExtra`<br>currentData: `TableData[]`|2.40.0 增加 currentData|
|cell-click|点击单元格时触发|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|row-click|点击行数据时触发|record: `TableData`<br>ev: `Event`||
|header-click|点击表头数据时触发|column: `TableColumnData`<br>ev: `Event`||
|column-resize|调整列宽时触发|dataIndex: `string`<br>width: `number`|2.28.0|
|row-dblclick|双击行数据时触发|record: `TableData`<br>ev: `Event`||
|cell-dblclick|双击单元格时触发|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
|row-contextmenu|右击行数据时触发|record: `TableData`<br>ev: `Event`||
|cell-contextmenu|右击单元格时触发|record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`||
### `<table>` Methods

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|selectAll|设置全选状态|checked: ` boolean `|-|2.22.0|
|select|设置行选择器状态|rowKey: ` string \| number \| (string \| number)[] `<br>checked: ` boolean `|-|2.31.0|
|expandAll|设置全部展开状态|checked: ` boolean `|-|2.31.0|
|expand|设置展开状态|rowKey: ` string \| number \| (string \| number)[] `<br>checked: ` boolean `|-|2.31.0|
|resetFilters|重置列的筛选器|dataIndex: ` string \| string[] `|-|2.31.0|
|clearFilters|清空列的筛选器|dataIndex: ` string \| string[] `|-|2.31.0|
|resetSorters|重置列的排序|-|-|2.31.0|
|clearSorters|清空列的排序|-|-|2.31.0|
### `<table>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|th|自定义 th 元素|column: `TableColumnData`|2.26.0|
|thead|自定义 thead 元素|-|2.26.0|
|empty|空白展示|-||
|summary-cell|总结行|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.23.0|
|pagination-right|分页器右侧内容|-|2.18.0|
|pagination-left|分页器左侧内容|-|2.18.0|
|td|自定义 td 元素|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|2.16.0|
|tr|自定义 tr 元素|record: `TableData`<br>rowIndex: `number`|2.16.0|
|tbody|自定义 tbody 元素|-|2.16.0|
|drag-handle-icon|拖拽锚点图标|-|2.16.0|
|footer|表格底部|-||
|expand-row|展开行内容|record: `TableData`||
|expand-icon|展开行图标|expanded: `boolean`<br>record: `TableData`||
|columns|表格列定义。启用时会屏蔽 columns 属性|-||




### `<table-column>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|data-index|列信息的标识，对应TableData中的数据|`string`|`-`||
|title|列标题|`string`|`-`||
|width|列宽度|`number`|`-`||
|align|对齐方向|`TableColumnData['align']`|`-`||
|fixed|固定位置|`TableColumnData['fixed']`|`-`||
|ellipsis|是否显示为省略|`boolean`|`false`||
|sortable|排序相关选项|`TableSortable`|`-`||
|filterable|过滤相关选项|`TableFilterable`|`-`||
|cell-class|自定义单元格类名|`ClassName`|`-`|2.36.0|
|header-cell-class|自定义表头单元格类名|`ClassName`|`-`|2.36.0|
|body-cell-class|自定义内容单元格类名|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|summary-cell-class|自定义总结栏单元格类名|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|cell-style|自定义单元格样式|`CSSProperties`|`-`|2.11.0|
|header-cell-style|自定义表头单元格样式|`CSSProperties`|`-`|2.29.0|
|body-cell-style|自定义内容单元格样式|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.29.0|
|summary-cell-style|自定义总结栏单元格样式|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.30.0|
|index|用于手动指定选项的 index。2.26.0 版本后不再需要手动指定|`number`|`-`|2.20.2|
|tooltip|在省略时是否显示文字提示|`boolean\|object`|`false`|2.26.0|
### `<table-column>` Slots

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|filter-icon|筛选按钮图标|-|2.23.0|
|filter-content|自定义筛选弹出框内容|filterValue: `string[]`<br>setFilterValue: `(filterValue: string[]) => void`<br>handleFilterConfirm: `(event: Event) => void`<br>handleFilterReset: `(event: Event) => void`|2.23.0|
|title|标题|-||
|cell|单元格|record: `TableData`<br>column: `TableColumnData`<br>rowIndex: `number`||



## Type

```ts
type Filters = Record<string, string[]>;

type Sorter = { filed: string; direction: 'ascend' | 'descend' } | Record<string, never>;
```


### TableData

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|key|数据行的key|`string`|`-`||
|expand|扩展行内容|`string \| RenderFunction`|`-`||
|children|子数据|`TableData[]`|`-`||
|disabled|是否禁用行选择器|`boolean`|`false`||
|isLeaf|是否是叶子节点|`boolean`|`false`|2.13.0|



### TableSortable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|sortDirections|支持的排序方向|`('ascend' \| 'descend')[]`|`-`|
|sorter|排序函数。设置为 `true` 可关闭内部排序。2.19.0 版本修改传出数据。|`((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean`|`-`|
|sortOrder|排序方向|`'ascend' \| 'descend' \| ''`|`-`|
|defaultSortOrder|默认排序方向（非受控模式）|`'ascend' \| 'descend' \| ''`|`-`|



### TableFilterData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|筛选数据选项的内容|`string \| RenderFunction`|`-`|
|value|筛选数据选项的值|`string`|`-`|



### TableFilterable

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|filters|筛选数据|`TableFilterData[]`|`-`||
|filter|筛选函数|`(filteredValue: string[], record: TableData) => boolean`|`-`||
|multiple|是否支持多选|`boolean`|`false`||
|filteredValue|筛选项|`string[]`|`-`||
|defaultFilteredValue|默认筛选项|`string[]`|`-`||
|renderContent|筛选框的内容|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild`|`-`||
|icon|筛选按钮的图标|`RenderFunction`|`-`||
|triggerProps|筛选框的弹出框配置|`TriggerProps`|`-`||
|alignLeft|筛选图标是否左对齐|`boolean`|`false`|2.13.0|



### TableColumnData

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|dataIndex|列信息的标识，对应 `TableData` 中的数据|`string`|`-`||
|title|列标题|`string \| RenderFunction`|`-`||
|width|列宽度|`number`|`-`||
|align|对齐方向|`'left' \| 'center' \| 'right'`|`-`||
|fixed|固定位置|`'left' \| 'right'`|`-`||
|ellipsis|是否显示省略号|`boolean`|`false`||
|tooltip|是否在显示省略号时显示文本提示。可填入 tooltip 组件属性|`boolean \| Record<string, any>`|`-`|2.26.0|
|sortable|排序相关选项|`TableSortable`|`-`||
|filterable|过滤相关选项|`TableFilterable`|`-`||
|children|表头子数据，用于表头分组|`TableColumnData[]`|`-`||
|cellClass|自定义单元格类名|`ClassName`|`-`|2.36.0|
|headerCellClass|自定义表头单元格类名|`ClassName`|`-`|2.36.0|
|bodyCellClass|自定义内容单元格类名|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|summaryCellClass|自定义总结栏单元格类名|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|cellStyle|自定义单元格样式|`CSSProperties`|`-`|2.11.0|
|headerCellStyle|自定义表头单元格样式|`CSSProperties`|`-`|2.29.0|
|bodyCellStyle|自定义内容单元格样式|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.29.0|
|summaryCellStyle|自定义总结栏单元格样式|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.30.0|
|render|自定义列单元格的渲染|`(data: {    record: TableData;    column: TableColumnData;    rowIndex: number;  }) => VNodeChild`|`-`||
|slotName|设置当前列的渲染插槽的名字。插槽参数同 #cell|`string`|`-`|2.18.0|
|titleSlotName|设置当前列的标题的渲染插槽的名字|`string`|`-`|2.23.0|



### TableBorder

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|wrapper|是否展示外边框|`boolean`|`false`|
|cell|是否展示单元格边框（表头+主体）|`boolean`|`false`|
|headerCell|是否展示表头单元格边框|`boolean`|`false`|
|bodyCell|是否展示主体单元格边框|`boolean`|`false`|



### TableRowSelection

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|type|行选择器的类型|`'checkbox' \| 'radio'`|`-`||
|selectedRowKeys|已选择的行（受控模式）|`BaseType[]`|`-`||
|defaultSelectedRowKeys|默认已选择的行（非受控模式）|`BaseType[]`|`-`||
|showCheckedAll|是否显示全选选择器|`boolean`|`false`||
|title|列标题|`string`|`-`||
|width|列宽度|`number`|`-`||
|fixed|是否固定|`boolean`|`false`||
|checkStrictly|是否开启严格选择模式|`boolean`|`true`|2.29.0|
|onlyCurrent|是否仅展示当前页的 keys（切换分页时清空 keys）|`boolean`|`false`|2.32.0|



### TableExpandable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|expandedRowKeys|显示的展开行（受控模式）|`BaseType[]`|`-`|
|defaultExpandedRowKeys|默认显示的展开行（非受控模式）|`BaseType[]`|`-`|
|defaultExpandAllRows|是否默认展开所有的行|`boolean`|`false`|
|expandedRowRender|自定义展开行内容|`(record: TableData) => VNodeChild`|`-`|
|icon|展开图标|`(expanded: boolean, record: TableData) => VNodeChild`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|



### TableDraggable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|拖拽类型|`'row' \| 'handle'`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|



### TableChangeExtra

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|触发类型|`'pagination' \| 'sorter' \| 'filter' \| 'drag'`|`-`|
|page|页码|`number`|`-`|
|pageSize|每页数据数|`number`|`-`|
|sorter|排序信息|`Sorter`|`-`|
|filters|筛选信息|`Filters`|`-`|
|dragTarget|拖拽信息|`TableData`|`-`|




### VirtualListProps

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|height|可视区域高度|`number \| string`|`-`||
|threshold|开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。|`number`|`-`||
|isStaticItemHeight|（已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 `fixedSize`|`boolean`|`false`||
|fixedSize|元素高度是否是固定的。|`boolean`|`false`|2.34.1|
|estimatedSize|元素高度不固定时的预估高度。|`number`|`-`|2.34.1|
|buffer|视口边界外提前挂载的元素数量。|`number`|`10`|2.34.1|



## FAQ

### 1. 关于元素插槽的使用

table 组件提供了内部元素的自定义插槽，这些插槽不同于普通插槽，对用户传入的内容有一定限制。
因为 vue 的插槽没有提供传出 children 并在 slot 中渲染的方式，我们针对 table 中的元素插槽，做了一些特殊处理，会在用户传入的内容中，附加上原有的 children，保证子元素的正常渲染。
此时需要用户注意，在元素插槽中自定义渲染时，需要传入单一空元素使用，不能在传入的元素中添加内容（参考例 1）。
如果用户需要传入复合元素，可以自定义组件，并指定 default 插槽，然后传入 table 的元素插槽中（参考例 2）。

例 1：
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
例 2：
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
