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

@import ./__demo__/subtree.md

@import ./__demo__/props.md

@import ./__demo__/sort.md

@import ./__demo__/fixed.md

@import ./__demo__/span.md

@import ./__demo__/group.md

@import ./__demo__/custom.md

@import ./__demo__/virtual-list.md


### `<table>` Props

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|columns|表格的列描述信息|`TableColumn[]`|`[]`||
|data|表格的数据|`TableData[]`|`[]`||
|bordered|是否显示边框|`boolean \| TableBorder`|`true`||
|hoverable|是否显示选中效果|`boolean`|`true`||
|stripe|是否开启斑马纹效果|`boolean`|`false`||
|size|表格的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'large'`||
|table-layout-fixed|表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。|`boolean`|`false`||
|loading|是否为加载中状态|`boolean`|`false`||
|hide-header|是否隐藏表头|`boolean`|`false`||
|row-selection|表格的行选择器配置|`TableRowSelection`|`-`||
|expandable|表格的展开行配置|`TableExpandable`|`-`||
|scroll|表格的滚动属性配置|`{ x: number; y: number }`|`-`||
|pagination|分页的属性配置|`boolean \| PaginationProps`|`true`||
|page-position|分页选择器的位置|`'tl' \| 'top' \| tr' \| 'bl' \| 'bottom' \| 'br'`|`'br'`||
|indent-size|树形表格的缩进距离|`number`|`16`||
|row-key|表格行 `key` 的取值字段|`string`|`'key'`||
|show-header|是否显示表头|`boolean`|`true`||
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动|`VirtualListProps`|`-`||
|span-method|单元格合并方法（索引从数据项开始计数）|`(data: {  record: TableData;  column: TableColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|2.10.0|
### `<table>` Events

|事件名|描述|参数|
|---|---|---|
|expand|点击展开行时触发|rowKey: `string`|
|expanded-change|已展开的数据行发生改变时触发|rowKeys: `string[]`|
|select|点击行选择器时触发|rowKeys: `string[]`|
|select-all|点击全选选择器时触发|checked: `boolean`|
|selection-change|已选择的数据行发生改变时触发|rowKeys: `string[]`|
|sorter-change|排序规则发生改变时触发|dataIndex: `string`<br>direction: `string`|
|filter-change|过滤选项发生改变时触发|dataIndex: `string`<br>filteredValues: `string[]`|
|page-change|表格分页发生改变时触发|page: `number`|
|page-size-change|表格每页数据数量发生改变时触发|pageSize: `number`|
|cell-click|点击单元格时触发|record: `TableData`<br>column: `TableColumn`|
|row-click|点击行数据时触发|record: `TableData`|
|header-click|点击表头数据时触发|column: `TableColumn`|
### `<table>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|footer|表格底部|-|
|expand-row|展开行内容|record: `TableData`|
|expand-icon|展开行图标|-|




### `<table-column>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|data-index|列信息的标识，对应TableData中的数据|`string`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|align|对齐方向|`TableColumn['align']`|`-`|
|fixed|固定位置|`TableColumn['fixed']`|`-`|
|ellipsis|是否显示为省略|`boolean`|`false`|
|sortable|排序相关选项|`TableSortable`|`-`|
|filterable|过滤相关选项|`TableFilterable`|`-`|
### `<table-column>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|title|标题|-|
|cell|单元格|record: `TableData`<br>column: `TableColumn`<br>rowIndex: `number`|




### TableData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|key|数据行的key|`string`|`-`|
|expand|扩展行内容|`string \| (() => VNode)`|`-`|
|children|子数据|`TableData[]`|`-`|
|disabled|是否禁用行选择器|`boolean`|`false`|



### TableSortable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|sortDirections|支持的排序方向|`Array<'ascend' \| 'descend'>`|`-`|
|sorter|排序函数|`(a: any, b: any) => number`|`-`|
|sortOrder|排序方向|`'ascend' \| 'descend' \| ''`|`-`|
|defaultSortOrder|默认排序方向（非受控模式）|`'ascend' \| 'descend' \| ''`|`-`|



### TableFilterData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|筛选数据选项的内容|`string \| (() => VNode)`|`-`|
|value|筛选数据选项的值|`string`|`-`|



### TableFilterable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|filters|筛选数据|`TableFilterData[]`|`-`|
|filter|筛选函数|`(filteredValue: string[], record: TableData) => boolean`|`-`|
|multiple|是否支持多选|`boolean`|`false`|
|filteredValue|筛选项|`string[]`|`-`|
|defaultFilteredValue|默认筛选项|`string[]`|`-`|
|renderContent|筛选框的内容|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNode`|`-`|
|icon|筛选按钮的图标|`() => VNode`|`-`|
|triggerProps|筛选框的弹出框配置|`TriggerProps`|`-`|



### TableColumn

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|dataIndex|列信息的标识，对应 `TableData` 中的数据|`string`|`-`|
|title|列标题|`string \| (() => VNode)`|`-`|
|width|列宽度|`number`|`-`|
|align|对齐方向|`'left' \| 'center' \| 'right'`|`-`|
|fixed|固定位置|`'left' \| 'right'`|`-`|
|ellipsis|是否显示省略号|`boolean`|`false`|
|sortable|排序相关选项|`TableSortable`|`-`|
|filterable|过滤相关选项|`TableFilterable`|`-`|
|children|表头子数据，用于表头分组|`TableColumn[]`|`-`|
|render|自定义列单元格的渲染|`({    record,    column,    rowIndex,  }: {    record: TableData;    column: TableColumn;    rowIndex: number;  }) => VNode`|`-`|



### TableRowSelection

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|行选择器的类型|`'checkbox' \| 'radio'`|`-`|
|selectedRowKeys|已选择的行（受控模式）|`string[]`|`-`|
|defaultSelectedRowKeys|默认已选择的行（非受控模式）|`string[]`|`-`|
|showCheckedAll|是否显示全选选择器|`boolean`|`false`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|



### TableExpandable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|expandedRowKeys|显示的展开行（受控模式）|`string[]`|`-`|
|defaultExpandedRowKeys|默认显示的展开行（非受控模式）|`string[]`|`-`|
|defaultExpandAllRows|是否默认展开所有的行|`boolean`|`false`|
|expandedRowRender|自定义展开行内容|`(record: TableData) => VNode`|`-`|
|icon|展开图标|`(expanded: boolean, record: TableData) => VNode`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|


