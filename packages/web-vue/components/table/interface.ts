import { Slot, VNode } from 'vue';
import { Data } from '../_utils/types';
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
  expand?: string | (() => VNode);
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

  [name: string]: any;
}

export interface TableSortable {
  /**
   * @zh 支持的排序方向
   * @en Supported sort direction
   */
  sortDirections: Array<'ascend' | 'descend'>;
  /**
   * @zh 排序函数
   * @en Sorting function
   */
  sorter?: (a: any, b: any) => number;
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

interface TableFilterData {
  /**
   * @zh 筛选数据选项的内容
   * @en Filter the content of the data option
   */
  text: string | (() => VNode);
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
  filters: TableFilterData[];
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
   * @param data
   */
  renderContent?: (data: {
    filterValue: string[];
    setFilterValue: (filterValue: string[]) => void;
    handleFilterConfirm: (event: Event) => void;
    handleFilterReset: (event: Event) => void;
  }) => VNode;
  /**
   * @zh 筛选按钮的图标
   * @en Filter icon for button
   */
  icon?: () => VNode;
  /**
   * @zh 筛选框的弹出框配置
   * @en Pop-up box configuration of filter box
   */
  triggerProps?: TriggerProps;
}

export interface TableColumn {
  /**
   * @zh 列信息的标识，对应 `TableData` 中的数据
   * @en The identifier of the column information, corresponding to the data in `TableData`
   */
  dataIndex: string;
  /**
   * @zh 列标题
   * @en Column header
   */
  title?: string | (() => VNode);
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
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
  children?: TableColumn[];
  /**
   * @zh 自定义列单元格的渲染
   * @en Customize the rendering of column cells
   * @param {TableData} record
   * @param {TableColumn} column
   * @param {number} rowIndex
   */
  render?: ({
    record,
    column,
    rowIndex,
  }: {
    record: TableData;
    column: TableColumn;
    rowIndex: number;
  }) => VNode;
  // private
  isLastLeftFixed?: boolean;
  isFirstRightFixed?: boolean;
  slot?: Slot;
}

export interface TableCell extends TableColumn {
  colSpan?: number;
  rowSpan?: number;
}

export interface TableBorder {
  wrapper?: boolean;
  cell?: boolean;
  headerCell?: boolean;
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
  selectedRowKeys?: string[];
  /**
   * @zh 默认已选择的行（非受控模式）
   * @en The selected row by default (uncontrolled mode)
   */
  defaultSelectedRowKeys?: string[];
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
}

export interface TableExpandable {
  /**
   * @zh 显示的展开行（受控模式）
   * @en Displayed Expanded Row (Controlled Mode)
   */
  expandedRowKeys?: string[];
  /**
   * @zh 默认显示的展开行（非受控模式）
   * @en Expand row displayed by default (Uncontrolled mode)
   */
  defaultExpandedRowKeys?: string[];
  /**
   * @zh 是否默认展开所有的行
   * @en Whether to expand all rows by default
   */
  defaultExpandAllRows?: boolean;
  /**
   * @zh 自定义展开行内容
   * @en Customize expanded row content
   */
  expandedRowRender?: (record: TableData) => VNode;
  /**
   * @zh 展开图标
   * @en Expand icon
   */
  icon?: (expanded: boolean, record: TableData) => VNode;
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

export interface TableOperationColumn {
  name: string;
  title?: string;
  width?: number;
  fixed?: boolean;
  isLastLeftFixed?: boolean;
  columnNode?: (props: any) => VNode;
  bodyNode?: (record: TableData, props: any) => VNode;
}

export interface TableComponents {
  operations: (operations: {
    expand?: TableOperationColumn;
    selection?: TableOperationColumn;
  }) => TableOperationColumn[];
}

export interface TableProps {
  columns: TableColumn[];
  data: TableData[];
  bordered?: boolean | TableBorder;
  rowSelection?: TableRowSelection;
  expandable?: TableExpandable;
  pagination?: boolean | Data;
  pagePosition?: string;
}

export type Filters = Record<string, string[]>;
export type Sorter =
  | { filed: string; direction: 'ascend' | 'descend' }
  | Record<string, never>;
