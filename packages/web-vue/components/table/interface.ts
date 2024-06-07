import { CSSProperties, RenderFunction, Slots, VNodeChild } from 'vue';
import { BaseType, ClassName, Data } from '../_utils/types';
import { TriggerProps } from '../trigger';

export const TABLE_PAGE_POSITION = [
  'tl',
  'top',
  'tr',
  'bl',
  'bottom',
  'br',
] as const;
export type TablePagePosition = typeof TABLE_PAGE_POSITION[number];

export interface TableData {
  /**
   * @zh 数据行的key
   * @en The key of the data row
   */
  key?: string;
  /**
   * @zh 扩展行内容
   * @en Expand row content
   */
  expand?: string | RenderFunction;
  /**
   * @zh 子数据
   * @en Sub data
   */
  children?: TableData[];
  /**
   * @zh 是否禁用行选择器
   * @en Whether to disable the row selector
   */
  disabled?: boolean;
  /**
   * @zh 是否是叶子节点
   * @en Whether it is a leaf node
   * @version 2.13.0
   */
  isLeaf?: boolean;

  [name: string]: any;
}

export interface TableDataWithRaw {
  raw: TableData;
  key: string;
  disabled?: boolean;
  expand?: string | RenderFunction;
  children?: TableDataWithRaw[];
  isLeaf?: boolean;
  hasSubtree?: boolean;
}

export interface TableSortable {
  /**
   * @zh 支持的排序方向
   * @en Supported sort direction
   */
  sortDirections: ('ascend' | 'descend')[];
  /**
   * @zh 排序函数。设置为 `true` 可关闭内部排序。2.19.0 版本修改传出数据。
   * @en Sorting function. Set to `true` to turn off internal sorting. Version 2.19.0 modifies outgoing data.
   */
  sorter?:
    | ((
        a: TableData,
        b: TableData,
        extra: { dataIndex: string; direction: 'ascend' | 'descend' }
      ) => number)
    | boolean;
  /**
   * @zh 排序方向
   * @en Sort direction
   */
  sortOrder?: 'ascend' | 'descend' | '';
  /**
   * @zh 默认排序方向（非受控模式）
   * @en Default sort direction (uncontrolled mode)
   */
  defaultSortOrder?: 'ascend' | 'descend' | '';
}

export interface TableFilterData {
  /**
   * @zh 筛选数据选项的内容
   * @en Filter the content of the data option
   */
  text: string | RenderFunction;
  /**
   * @zh 筛选数据选项的值
   * @en Filter the value of the data option
   */
  value: string;
}

export interface TableFilterable {
  /**
   * @zh 筛选数据
   * @en Filter data
   */
  filters?: TableFilterData[];
  /**
   * @zh 筛选函数
   * @en Filter function
   */
  filter: (filteredValue: string[], record: TableData) => boolean;
  /**
   * @zh 是否支持多选
   * @en Whether to support multiple selection
   */
  multiple?: boolean;
  /**
   * @zh 筛选项
   * @en Filter value
   */
  filteredValue?: string[];
  /**
   * @zh 默认筛选项
   * @en Default filter value
   */
  defaultFilteredValue?: string[];
  /**
   * @zh 筛选框的内容
   * @en The content of filter box
   */
  renderContent?: (data: {
    filterValue: string[];
    setFilterValue: (filterValue: string[]) => void;
    handleFilterConfirm: (event: Event) => void;
    handleFilterReset: (event: Event) => void;
  }) => VNodeChild;
  /**
   * @zh 筛选按钮的图标
   * @en Filter icon for button
   */
  icon?: RenderFunction;
  /**
   * @zh 筛选框的弹出框配置
   * @en Pop-up box configuration of filter box
   */
  triggerProps?: TriggerProps;
  /**
   * @zh 筛选图标是否左对齐
   * @en Whether the filter icon is aligned to the left
   * @version 2.13.0
   */
  alignLeft?: boolean;

  slotName?: string;
}

export interface TableColumnData {
  /**
   * @zh 列信息的标识，对应 `TableData` 中的数据
   * @en The identifier of the column information, corresponding to the data in `TableData`
   */
  dataIndex?: string;
  /**
   * @zh 列标题
   * @en Column header
   */
  title?: string | RenderFunction;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 最小列宽
   * @en Minimum column width
   */
  minWidth?: number;
  /**
   * @zh 对齐方向
   * @en Alignment direction
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @zh 固定位置
   * @en Fixed position
   */
  fixed?: 'left' | 'right';
  /**
   * @zh 是否显示省略号
   * @en Whether to show ellipsis
   */
  ellipsis?: boolean;
  /**
   * @zh 是否在显示省略号时显示文本提示。可填入 tooltip 组件属性
   * @en Whether to show a text hint when an ellipsis is displayed. Can be filled in tooltip component properties
   * @version 2.26.0
   */
  tooltip?: boolean | Record<string, any>;
  /**
   * @zh 排序相关选项
   * @en Sorting related options
   */
  sortable?: TableSortable;
  /**
   * @zh 过滤相关选项
   * @en Filter related options
   */
  filterable?: TableFilterable;
  /**
   * @zh 表头子数据，用于表头分组
   * @en Header sub-data, used for header grouping
   */
  children?: TableColumnData[];
  /**
   * @zh 自定义单元格类名
   * @en Custom cell class
   * @version 2.36.0
   */
  cellClass?: ClassName;
  /**
   * @zh 自定义表头单元格类名
   * @en Custom header cell class
   * @version 2.36.0
   */
  headerCellClass?: ClassName;
  /**
   * @zh 自定义内容单元格类名
   * @en Custom body cell class
   * @version 2.36.0
   */
  bodyCellClass?: ClassName | ((record: TableData) => ClassName);
  /**
   * @zh 自定义总结栏单元格类名
   * @en Custom body cell class
   * @version 2.36.0
   */
  summaryCellClass?: ClassName | ((record: TableData) => ClassName);
  /**
   * @zh 自定义单元格样式
   * @en Custom cell style
   * @version 2.11.0
   */
  cellStyle?: CSSProperties;
  /**
   * @zh 自定义表头单元格样式
   * @en Custom header cell style
   * @version 2.29.0
   */
  headerCellStyle?: CSSProperties;
  /**
   * @zh 自定义内容单元格样式
   * @en Custom body cell style
   * @version 2.29.0
   */
  bodyCellStyle?: CSSProperties | ((record: TableData) => CSSProperties);
  /**
   * @zh 自定义总结栏单元格样式
   * @en Custom summary cell style
   * @version 2.30.0
   */
  summaryCellStyle?: CSSProperties | ((record: TableData) => CSSProperties);
  /**
   * @zh 自定义列单元格的渲染
   * @en Customize the rendering of column cells
   */
  render?: (data: {
    record: TableData;
    column: TableColumnData;
    rowIndex: number;
  }) => VNodeChild;
  /**
   * @zh 设置当前列的渲染插槽的名字。插槽参数同 #cell
   * @en Sets the name of the render slot for the current column. Slot parameters are the same as #cell
   * @version 2.18.0
   */
  slotName?: string;
  /**
   * @zh 设置当前列的标题的渲染插槽的名字
   * @en Set the name of the render slot for the header of the current column
   * @version 2.23.0
   */
  titleSlotName?: string;

  // private
  slots?: Slots;
  isLastLeftFixed?: boolean;
  isFirstRightFixed?: boolean;
  colSpan?: number;
  rowSpan?: number;
  index?: number;
  parent?: TableColumnData;
  _resizeWidth?: number;
}

export interface TableBorder {
  /**
   * @zh 是否展示外边框
   * @en TWhether to display the outer border
   */
  wrapper?: boolean;
  /**
   * @zh 是否展示单元格边框（表头+主体）
   * @en Whether to display the cell border (header + body)
   */
  cell?: boolean;
  /**
   * @zh 是否展示表头单元格边框
   * @en Whether to display the header cell border
   */
  headerCell?: boolean;
  /**
   * @zh 是否展示主体单元格边框
   * @en Whether to display the body cell border
   */
  bodyCell?: boolean;
}

export interface TableRowSelection {
  /**
   * @zh 行选择器的类型
   * @en The type of row selector
   */
  type?: 'checkbox' | 'radio';
  /**
   * @zh 已选择的行（受控模式）
   * @en Selected row (controlled mode)
   */
  selectedRowKeys?: BaseType[];
  /**
   * @zh 默认已选择的行（非受控模式）
   * @en The selected row by default (uncontrolled mode)
   */
  defaultSelectedRowKeys?: BaseType[];
  /**
   * @zh 是否显示全选选择器
   * @en Whether to show the select all selector
   */
  showCheckedAll?: boolean;
  // crossPage?: boolean;
  /**
   * @zh 列标题
   * @en Column title
   */
  title?: string;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 是否固定
   * @en Is it fixed
   */
  fixed?: boolean;
  /**
   * @zh 是否开启严格选择模式
   * @en Whether to enable strict selection mode
   * @defaultValue true
   * @version 2.29.0
   */
  checkStrictly?: boolean;
  /**
   * @zh 是否仅展示当前页的 keys（切换分页时清空 keys）
   * @en Whether to display only the keys of the current page (clear keys when switching paging)
   * @version 2.32.0
   */
  onlyCurrent?: boolean;
}

export interface TableExpandable {
  /**
   * @zh 显示的展开行（受控模式）
   * @en Displayed Expanded Row (Controlled Mode)
   */
  expandedRowKeys?: BaseType[];
  /**
   * @zh 默认显示的展开行（非受控模式）
   * @en Expand row displayed by default (Uncontrolled mode)
   */
  defaultExpandedRowKeys?: BaseType[];
  /**
   * @zh 是否默认展开所有的行
   * @en Whether to expand all rows by default
   */
  defaultExpandAllRows?: boolean;
  /**
   * @zh 自定义展开行内容
   * @en Customize expanded row content
   */
  expandedRowRender?: (record: TableData) => VNodeChild;
  /**
   * @zh 展开图标
   * @en Expand icon
   */
  icon?: (expanded: boolean, record: TableData) => VNodeChild;
  /**
   * @zh 列标题
   * @en Column title
   */
  title?: string;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 是否固定
   * @en Is it fixed
   */
  fixed?: boolean;
}

export interface TableDraggable {
  /**
   * @zh 拖拽类型
   * @en drag type
   */
  type?: 'row' | 'handle';
  /**
   * @zh 列标题
   * @en Column title
   */
  title?: string;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 是否固定
   * @en Is it fixed
   */
  fixed?: boolean;
}

export type OperationName =
  | 'selection-checkbox'
  | 'selection-radio'
  | 'expand'
  | 'drag-handle';

export interface TableOperationColumn {
  name: OperationName | string;
  title?: string | RenderFunction;
  width?: number;
  fixed?: boolean;
  render?: (record: TableData) => VNodeChild;
  isLastLeftFixed?: boolean;
}

export interface TableComponents {
  operations: (operations: {
    dragHandle?: TableOperationColumn;
    expand?: TableOperationColumn;
    selection?: TableOperationColumn;
  }) => TableOperationColumn[];
}

export interface TableChangeExtra {
  /**
   * @zh 触发类型
   * @en Trigger type
   */
  type: 'pagination' | 'sorter' | 'filter' | 'drag';
  /**
   * @zh 页码
   * @en page number
   */
  page?: number;
  /**
   * @zh 每页数据数
   * @en number per page
   */
  pageSize?: number;
  /**
   * @zh 排序信息
   * @en Sort information
   */
  sorter?: Sorter;
  /**
   * @zh 筛选信息
   * @en Filter information
   */
  filters?: Filters;
  /**
   * @zh 拖拽信息
   * @en Drag and drop information
   */
  dragTarget?: TableData;
}

export interface TableProps {
  columns: TableColumnData[];
  data: TableData[];
  bordered?: boolean | TableBorder;
  rowSelection?: TableRowSelection;
  expandable?: TableExpandable;
  pagination?: boolean | Data;
  pagePosition?: string;
}

export type Sorter = { field: string; direction: 'ascend' | 'descend' };

export type Filters = Record<string, string[]>;
