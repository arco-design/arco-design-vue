import type {
  ComponentPublicInstance,
  CSSProperties,
  PropType,
  Slot,
} from 'vue';
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { Size } from '../_utils/constant';
import {
  isArray,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '../_utils/is';
import { debounce } from '../_utils/debounce';
import type {
  TableBorder,
  TableChangeExtra,
  TableColumnData,
  TableComponents,
  TableData,
  TableDataWithRaw,
  TableDraggable,
  TableExpandable,
  TableOperationColumn,
  TablePagePosition,
  TableRowSelection,
} from './interface';
import { getGroupColumns, spliceFromPath } from './utils';
import { useRowSelection } from './hooks/use-row-selection';
import { useExpand } from './hooks/use-expand';
import { usePagination } from './hooks/use-pagination';
import IconPlus from '../icon/icon-plus';
import IconMinus from '../icon/icon-minus';
import Spin from '../spin';
import Pagination, { PaginationProps } from '../pagination';
import Empty from '../empty';
import ColGroup from './table-col-group.vue';
import Thead from './table-thead';
import Tbody from './table-tbody';
import Tr from './table-tr';
import Th from './table-th';
import Td from './table-td';
import OperationTh from './table-operation-th';
import OperationTd from './table-operation-td';
import VirtualList from '../_components/virtual-list-v2';
import ResizeObserver from '../_components/resize-observer';
import { VirtualListProps } from '../_components/virtual-list-v2/interface';
import { omit } from '../_utils/omit';
import { configProviderInjectionKey } from '../config-provider/context';
import { useDrag } from './hooks/use-drag';
import { useColumnResize } from './hooks/use-column-resize';
import { tableInjectionKey } from './context';
import { useFilter } from './hooks/use-filter';
import { useSorter } from './hooks/use-sorter';
import ClientOnly from '../_components/client-only';
import { useSpan } from './hooks/use-span';
import { useChildrenComponents } from '../_hooks/use-children-components';
import Scrollbar, { ScrollbarProps } from '../scrollbar';
import { useComponentRef } from '../_hooks/use-component-ref';
import type { BaseType } from '../_utils/types';
import { useScrollbar } from '../_hooks/use-scrollbar';
import { getValueByPath, setValueByPath } from '../_utils/get-value-by-path';

const DEFAULT_BORDERED = {
  wrapper: true,
  cell: false,
  headerCell: false,
  bodyCell: false,
};

export default defineComponent({
  name: 'Table',
  props: {
    /**
     * @zh 表格的列描述信息
     * @en Column info of the table
     */
    columns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    /**
     * @zh 表格的数据
     * @en Table data
     */
    data: {
      type: Array as PropType<TableData[]>,
      default: () => [],
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     */
    bordered: {
      type: [Boolean, Object] as PropType<boolean | TableBorder>,
      default: true,
    },
    /**
     * @zh 是否显示选中效果
     * @en Whether to show the hover effect
     */
    hoverable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否开启斑马纹效果
     * @en Whether to enable the stripe effect
     */
    stripe: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格的大小
     * @en The size of the table
     * @values 'mini','small','medium','large'
     * @defaultValue 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: () =>
        inject(configProviderInjectionKey, undefined)?.size ?? 'large',
    },
    /**
     * @zh 表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。
     * @en The table-layout property of the table is set to fixed. After it is set to fixed, the width of the table will not be stretched beyond 100% by the content.
     */
    tableLayoutFixed: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
      type: [Boolean, Object],
      default: false,
    },
    /**
     * @zh 表格的行选择器配置
     * @en Table row selector configuration
     */
    rowSelection: {
      type: Object as PropType<TableRowSelection>,
    },
    /**
     * @zh 表格的展开行配置
     * @en Expand row configuration of the table
     */
    expandable: {
      type: Object as PropType<TableExpandable>,
    },
    /**
     * @zh 表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。
     * @en Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values. `2.20.0` version adds support for `minWidth`, `maxHeight`.
     */
    scroll: {
      type: Object as PropType<{
        x?: number | string;
        y?: number | string;
        minWidth?: number | string;
        maxHeight?: number | string;
      }>,
    },
    /**
     * @zh 分页的属性配置
     * @en Pagination properties configuration
     */
    pagination: {
      type: [Boolean, Object] as PropType<boolean | PaginationProps>,
      default: true,
    },
    /**
     * @zh 分页选择器的位置
     * @en The position of the page selector
     * @values 'tl','top',tr','bl','bottom','br'
     */
    pagePosition: {
      type: String as PropType<TablePagePosition>,
      default: 'br',
    },
    /**
     * @zh 树形表格的缩进距离
     * @en The indentation distance of the tree table
     */
    indentSize: {
      type: Number,
      default: 16,
    },
    /**
     * @zh 表格行 `key` 的取值字段
     * @en Value field of table row `key`
     */
    rowKey: {
      type: String,
      default: 'key',
    },
    /**
     * @zh 是否显示表头
     * @en Whether to show the header
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
     * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
     * @type VirtualListProps
     */
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
    /**
     * @zh 单元格合并方法（索引从数据项开始计数）
     * @en Cell merge method (The index starts counting from the data item)
     * @version 2.10.0
     */
    spanMethod: {
      type: Function as PropType<
        (data: {
          record: TableData;
          column: TableColumnData | TableOperationColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
    },
    /**
     * @zh 是否让合并方法的索引包含所有
     * @en Whether to make the index of the span method contain all
     * @version 2.18.0
     */
    spanAll: {
      type: Boolean,
      default: false,
    },
    components: {
      type: Object as PropType<TableComponents>,
    },
    /**
     * @zh 数据懒加载函数，传入时开启懒加载功能
     * @en Data lazy loading function, open the lazy loading function when it is passed in
     * @version 2.13.0
     */
    loadMore: {
      type: Function as PropType<
        (record: TableData, done: (children?: TableData[]) => void) => void
      >,
    },
    /**
     * @zh 筛选图标是否左对齐
     * @en Whether the filter icon is aligned to the left
     * @version 2.13.0
     */
    filterIconAlignLeft: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在子树为空时隐藏展开按钮
     * @en Whether to hide expand button when subtree is empty
     * @version 2.14.0
     */
    hideExpandButtonOnEmpty: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格行元素的类名。`2.34.0` 版本增加函数值支持
     * @en The class name of the table row element. The `2.34.0` version adds support for function values.
     * @version 2.16.0
     */
    rowClass: {
      type: [String, Array, Object, Function] as PropType<
        | string
        | any[]
        | Record<string, any>
        | ((record: TableData, rowIndex: number) => any)
      >,
    },
    /**
     * @zh 表格拖拽排序的配置
     * @en Table drag and drop sorting configuration
     * @version 2.16.0
     */
    draggable: {
      type: Object as PropType<TableDraggable>,
    },
    rowNumber: {
      type: [Boolean, Object],
    },
    /**
     * @zh 是否允许调整列宽
     * @en Whether to allow the column width to be adjusted
     * @version 2.16.0
     */
    columnResizable: {
      type: Boolean,
    },
    /**
     * @zh 显示表尾总结行
     * @en Show footer summary row
     * @version 2.21.0
     */
    summary: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((params: {
            columns: TableColumnData[];
            data: TableData[];
          }) => TableData[])
      >,
    },
    /**
     * @zh 总结行的首列文字
     * @en The first column of text in the summary line
     * @version 2.21.0
     */
    summaryText: {
      type: String,
      default: 'Summary',
    },
    /**
     * @zh 总结行的单元格合并方法
     * @en Cell Merge Method for Summarizing Rows
     * @version 2.21.0
     */
    summarySpanMethod: {
      type: Function as PropType<
        (data: {
          record: TableData;
          column: TableColumnData | TableOperationColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
    },
    /**
     * @zh 已选择的行（受控模式）优先于 `rowSelection`
     * @en Selected row (controlled mode) takes precedence over `rowSelection`
     * @version 2.25.0
     */
    selectedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 默认已选择的行（非受控模式）优先于 `rowSelection`
     * @en The selected row by default (uncontrolled mode) takes precedence over `rowSelection`
     * @version 2.25.0
     */
    defaultSelectedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 显示的展开行、子树（受控模式）优先于 `expandable`
     * @en Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`
     * @version 2.25.0
     */
    expandedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 默认显示的展开行、子树（非受控模式）优先于 `expandable`
     * @en Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`
     * @version 2.25.0
     */
    defaultExpandedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 是否默认展开所有的行
     * @en Whether to expand all rows by default
     * @version 2.25.0
     */
    defaultExpandAllRows: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启表头吸顶
     * @en Whether to open the sticky header
     * @version 2.30.0
     */
    stickyHeader: {
      type: [Boolean, Number],
      default: false,
    },
    /**
     * @zh 是否开启虚拟滚动条
     * @en Whether to enable virtual scroll bar
     * @version 2.38.0
     */
    scrollbar: {
      type: [Object, Boolean] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
  },
  emits: {
    'update:selectedKeys': (rowKeys: (string | number)[]) => true,
    'update:expandedKeys': (rowKeys: (string | number)[]) => true,
    /**
     * @zh 点击展开行时触发
     * @en Triggered when a row is clicked to expand
     * @param {string | number} rowKey
     * @param {TableData} record
     */
    'expand': (rowKey: string | number, record: TableData) => true,
    /**
     * @zh 已展开的数据行发生改变时触发
     * @en Triggered when the expanded data row changes
     * @param {(string | number)[]} rowKeys
     */
    'expandedChange': (rowKeys: (string | number)[]) => true,
    /**
     * @zh 点击行选择器时触发
     * @en Triggered when the row selector is clicked
     * @param {string | number[]} rowKeys
     * @param {string | number} rowKey
     * @param {TableData} record
     */
    'select': (
      rowKeys: (string | number)[],
      rowKey: string | number,
      record: TableData
    ) => true,
    /**
     * @zh 点击全选选择器时触发
     * @en Triggered when the select all selector is clicked
     * @param {boolean} checked
     */
    'selectAll': (checked: boolean) => true,
    /**
     * @zh 已选择的数据行发生改变时触发
     * @en Triggered when the selected data row changes
     * @param {(string | number)[]} rowKeys
     */
    'selectionChange': (rowKeys: (string | number)[]) => true,
    /**
     * @zh 排序规则发生改变时触发
     * @en Triggered when the collation changes
     * @param {string} dataIndex
     * @param {string} direction
     */
    'sorterChange': (dataIndex: string, direction: string) => true,
    /**
     * @zh 过滤选项发生改变时触发
     * @en Triggered when the filter options are changed
     * @param {string} dataIndex
     * @param {string[]} filteredValues
     */
    'filterChange': (dataIndex: string, filteredValues: string[]) => true,
    /**
     * @zh 表格分页发生改变时触发
     * @en Triggered when the table pagination changes
     * @param {number} page
     */
    'pageChange': (page: number) => true,
    /**
     * @zh 表格每页数据数量发生改变时触发
     * @en Triggered when the number of data per page of the table changes
     * @param {number} pageSize
     */
    'pageSizeChange': (pageSize: number) => true,
    /**
     * @zh 表格数据发生变化时触发
     * @en Triggered when table data changes
     * @param {TableData[]} data
     * @param {TableChangeExtra} extra
     * @param {TableData[]} currentData
     * @version 2.40.0 增加 currentData
     */
    'change': (
      data: TableData[],
      extra: TableChangeExtra,
      currentData: TableData[]
    ) => true,
    /**
     * @zh 单元格 hover 进入时触发
     * @en Triggered when hovering into a cell
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cellMouseEnter': (record: TableData, column: TableColumnData, ev: Event) =>
      true,
    /**
     * @zh 单元格 hover 退出时触发
     * @en Triggered when hovering out of a cell
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cellMouseLeave': (record: TableData, column: TableColumnData, ev: Event) =>
      true,
    /**
     * @zh 点击单元格时触发
     * @en Triggered when a cell is clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cellClick': (record: TableData, column: TableColumnData, ev: Event) =>
      true,
    /**
     * @zh 点击行数据时触发
     * @en Triggered when row data is clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    'rowClick': (record: TableData, ev: Event) => true,
    /**
     * @zh 点击表头数据时触发
     * @en Triggered when the header data is clicked
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'headerClick': (column: TableColumnData, ev: Event) => true,
    /**
     * @zh 调整列宽时触发
     * @en Triggered when column width is adjusted
     * @param {string} dataIndex
     * @param {number} width
     * @version 2.28.0
     */
    'columnResize': (dataIndex: string, width: number) => true,
    /**
     * @zh 双击行数据时触发
     * @en Triggered when row data is double clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    'rowDblclick': (record: TableData, ev: Event) => true,
    /**
     * @zh 双击单元格时触发
     * @en Triggered when a cell is double clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cellDblclick': (record: TableData, column: TableColumnData, ev: Event) =>
      true,
    /**
     * @zh 右击行数据时触发
     * @en Triggered when row data is right clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    'rowContextmenu': (record: TableData, ev: Event) => true,
    /**
     * @zh 右击单元格时触发
     * @en Triggered when a cell is right clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cellContextmenu': (
      record: TableData,
      column: TableColumnData,
      ev: Event
    ) => true,
  },
  /**
   * @zh 表格列定义。启用时会屏蔽 columns 属性
   * @en Table column definitions. When enabled, the columns attribute is masked
   * @slot columns
   */
  /**
   * @zh 展开行图标
   * @en Expand row icon
   * @slot expand-icon
   * @binding {boolean} expanded
   * @binding {TableData} record
   */
  /**
   * @zh 展开行内容
   * @en Expand row content
   * @slot expand-row
   * @binding {TableData} record
   */
  /**
   * @zh 表格底部
   * @en Table Footer
   * @slot footer
   */
  /**
   * @zh 拖拽锚点图标
   * @en Drag handle icon
   * @slot drag-handle-icon
   * @version 2.16.0
   */
  /**
   * @zh 自定义 tbody 元素
   * @en Custom tbody element
   * @slot tbody
   * @version 2.16.0
   */
  /**
   * @zh 自定义 tr 元素
   * @en Custom tr element
   * @slot tr
   * @binding {TableData} record
   * @binding {number} rowIndex
   * @version 2.16.0
   */
  /**
   * @zh 自定义 td 元素
   * @en Custom td element
   * @slot td
   * @binding {TableColumnData} column
   * @binding {TableData} record
   * @binding {number} rowIndex
   * @version 2.16.0
   */
  /**
   * @zh 分页器左侧内容
   * @en Content on the left side of the pagination
   * @slot pagination-left
   * @version 2.18.0
   */
  /**
   * @zh 分页器右侧内容
   * @en Content on the right side of the pagination
   * @slot pagination-right
   * @version 2.18.0
   */
  /**
   * @zh 总结行
   * @en Content on the right side of the pagination
   * @slot summary-cell
   * @binding {TableColumnData} column
   * @binding {TableData} record
   * @binding {number} rowIndex
   * @version 2.23.0
   */
  /**
   * @zh 空白展示
   * @en Empty
   * @slot empty
   */
  /**
   * @zh 自定义 thead 元素
   * @en Custom thead element
   * @slot thead
   * @version 2.26.0
   */
  /**
   * @zh 自定义 th 元素
   * @en Custom th element
   * @slot th
   * @binding {TableColumnData} column
   * @version 2.26.0
   */
  setup(props, { emit, slots }) {
    const {
      columns,
      rowKey,
      rowSelection,
      expandable,
      loadMore,
      filterIconAlignLeft,
      selectedKeys,
      defaultSelectedKeys,
      expandedKeys,
      defaultExpandedKeys,
      defaultExpandAllRows,
      spanMethod,
      draggable,
      summarySpanMethod,
      scrollbar,
    } = toRefs(props);
    const prefixCls = getPrefixCls('table');
    const configCtx = inject(configProviderInjectionKey, undefined);
    const bordered = computed(() => {
      if (isObject(props.bordered)) {
        return { ...DEFAULT_BORDERED, ...props.bordered };
      }
      return { ...DEFAULT_BORDERED, wrapper: props.bordered };
    });
    const { children, components } = useChildrenComponents('TableColumn');
    const checkStrictly = computed(
      () => rowSelection.value?.checkStrictly ?? true
    );

    const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar);

    // whether to scroll
    const isScroll = computed(() => {
      const x = Boolean(props.scroll?.x || props.scroll?.minWidth);
      const y = Boolean(props.scroll?.y || props.scroll?.maxHeight);
      return { x, y };
    });

    // const theadRef = ref<HTMLElement>();
    const summaryRef = ref<HTMLElement>();
    const thRefs = ref<Record<string, HTMLElement>>({});

    const { componentRef: contentComRef, elementRef: contentRef } =
      useComponentRef('containerRef');
    const { componentRef: tbodyComRef, elementRef: tbodyRef } =
      useComponentRef('containerRef');
    const { componentRef: virtualComRef, elementRef: virtualRef } =
      useComponentRef('viewportRef');
    const { componentRef: theadComRef, elementRef: theadRef } =
      useComponentRef('containerRef');
    const containerElement = computed(() => {
      if (splitTable.value) {
        if (isVirtualList.value) {
          return virtualRef.value;
        }
        return tbodyRef.value;
      }
      return contentRef.value;
    });

    const splitTable = computed(
      () =>
        isScroll.value.y ||
        props.stickyHeader ||
        isVirtualList.value ||
        (isScroll.value.x && flattenData.value.length === 0)
    );

    const slotColumnMap = reactive(new Map<number, TableColumnData>());
    const slotColumns = ref<TableColumnData[]>();

    watch([components, slotColumnMap], ([components, slotColumnMap]) => {
      if (components.length > 0) {
        const columns: TableColumnData[] = [];
        components.forEach((id) => {
          const column = slotColumnMap.get(id);
          if (column) columns.push(column);
        });
        slotColumns.value = columns;
      } else {
        slotColumns.value = undefined;
      }
    });

    // 拆解分组后的数据表头信息
    const dataColumnMap = new Map<string, TableColumnData>();
    const dataColumns = ref<TableColumnData[]>([]);
    const groupColumns = ref<TableColumnData[][]>([]);

    watch(
      [columns, slotColumns],
      ([columns, slotColumns]) => {
        const result = getGroupColumns(
          slotColumns ?? columns ?? [],
          dataColumnMap
        );
        dataColumns.value = result.dataColumns;
        groupColumns.value = result.groupColumns;
      },
      { immediate: true, deep: true }
    );

    const isPaginationTop = computed(() =>
      ['tl', 'top', 'tr'].includes(props.pagePosition)
    );

    const hasLeftFixedColumn = ref(false);
    const hasRightFixedColumn = ref(false);
    const hasLeftFixedDataColumns = ref(false);

    watchEffect(() => {
      let _hasLeftFixedColumn = false;
      let _hasRightFixedColumn = false;
      let _hasLeftFixedDataColumns = false;
      if (
        props.rowSelection?.fixed ||
        props.expandable?.fixed ||
        props.draggable?.fixed
      ) {
        _hasLeftFixedColumn = true;
      }
      for (const column of dataColumns.value) {
        if (column.fixed === 'left') {
          _hasLeftFixedColumn = true;
          _hasLeftFixedDataColumns = true;
        } else if (column.fixed === 'right') {
          _hasRightFixedColumn = true;
        }
      }
      if (_hasLeftFixedColumn !== hasLeftFixedColumn.value) {
        hasLeftFixedColumn.value = _hasLeftFixedColumn;
      }
      if (_hasRightFixedColumn !== hasRightFixedColumn.value) {
        hasRightFixedColumn.value = _hasRightFixedColumn;
      }
      if (_hasLeftFixedDataColumns !== hasLeftFixedDataColumns.value) {
        hasLeftFixedDataColumns.value = _hasLeftFixedDataColumns;
      }
    });

    const hasEllipsis = computed(() => {
      for (const col of dataColumns.value) {
        if (col.ellipsis) {
          return true;
        }
      }
      return false;
    });

    const handleChange = (
      type: 'pagination' | 'sorter' | 'filter' | 'drag'
    ) => {
      const extra: TableChangeExtra = {
        type,
        page: page.value,
        pageSize: pageSize.value,
        sorter: computedSorter.value,
        filters: computedFilters.value,
        dragTarget: type === 'drag' ? dragState.data : undefined,
      };
      emit('change', flattenRawData.value, extra, sortedData.value);
    };

    const handleFilterChange = (
      dataIndex: string,
      filteredValues: string[]
    ) => {
      _filters.value = {
        ...computedFilters.value,
        [dataIndex]: filteredValues,
      };

      emit('filterChange', dataIndex, filteredValues);
      handleChange('filter');
    };

    const handleSorterChange = (
      dataIndex: string,
      direction: 'ascend' | 'descend' | ''
    ) => {
      _sorter.value = direction
        ? {
            field: dataIndex,
            direction,
          }
        : undefined;

      emit('sorterChange', dataIndex, direction);
      handleChange('sorter');
    };

    const { _filters, computedFilters, resetFilters, clearFilters } = useFilter(
      {
        columns: dataColumns,
        onFilterChange: handleFilterChange,
      }
    );
    const { _sorter, computedSorter, resetSorters, clearSorters } = useSorter({
      columns: dataColumns,
      onSorterChange: handleSorterChange,
    });

    const disabledKeys = new Set();

    const allRowKeys = computed(() => {
      const allRowKeys: BaseType[] = [];
      disabledKeys.clear();
      const travelData = (data: TableData[]) => {
        if (isArray(data) && data.length > 0) {
          for (const record of data) {
            allRowKeys.push(record[rowKey.value]);
            if (record.disabled) {
              disabledKeys.add(record[rowKey.value]);
            }
            if (record.children) {
              travelData(record.children);
            }
          }
        }
      };

      travelData(props.data);

      return allRowKeys;
    });

    const currentAllRowKeys = computed(() => {
      const keys: BaseType[] = [];
      const travel = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          keys.push(record.key);
          if (record.children) {
            travel(record.children);
          }
        }
      };
      travel(flattenData.value);

      return keys;
    });

    const currentAllEnabledRowKeys = computed(() => {
      const keys: BaseType[] = [];

      const travel = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          if (!record.disabled) {
            keys.push(record.key);
          }
          if (record.children) {
            travel(record.children);
          }
        }
      };
      travel(flattenData.value);

      return keys;
    });

    const {
      isRadio,
      selectedRowKeys,
      currentSelectedRowKeys,
      handleSelect,
      handleSelectAllLeafs,
      handleSelectAll,
      select,
      selectAll,
      clearSelected,
    } = useRowSelection({
      selectedKeys,
      defaultSelectedKeys,
      rowSelection,
      currentAllRowKeys,
      currentAllEnabledRowKeys,
      emit,
    });

    const { expandedRowKeys, handleExpand, expand, expandAll } = useExpand({
      expandedKeys,
      defaultExpandedKeys,
      defaultExpandAllRows,
      expandable,
      allRowKeys,
      emit,
    });

    const lazyLoadData = reactive<Record<string, TableData[]>>({});

    const addLazyLoadData = (
      children: TableData[] | undefined,
      record: TableDataWithRaw
    ) => {
      if (children) {
        lazyLoadData[record.key] = children;
      }
    };

    const isValidRecord = (record: TableDataWithRaw) => {
      for (const field of Object.keys(computedFilters.value)) {
        const filteredValues = computedFilters.value[field];
        const column = dataColumnMap.get(field);
        if (column && column.filterable?.filter && filteredValues.length > 0) {
          const result = column.filterable?.filter(filteredValues, record.raw);
          if (!result) {
            return result;
          }
        }
      }
      return true;
    };

    const {
      dragType,
      dragState,
      handleDragStart,
      handleDragEnter,
      handleDragLeave,
      handleDragover,
      handleDragEnd,
      handleDrop,
    } = useDrag(draggable);

    const { resizingColumn, columnWidth, handleThMouseDown } = useColumnResize(
      thRefs,
      emit
    );

    const processedData = computed(() => {
      const travel = (data: TableData[]) => {
        const result: TableDataWithRaw[] = [];

        for (const _record of data) {
          const record: TableDataWithRaw = {
            raw: _record,
            key: _record[props.rowKey],
            disabled: _record.disabled,
            expand: _record.expand,
            isLeaf: _record.isLeaf,
          };
          if (_record.children) {
            record.isLeaf = false;
            record.children = travel(_record.children);
          } else if (props.loadMore && !_record.isLeaf) {
            record.isLeaf = false;
            if (lazyLoadData[record.key]) {
              record.children = travel(lazyLoadData[record.key]);
            }
          } else {
            record.isLeaf = true;
          }
          record.hasSubtree = Boolean(
            record.children
              ? props.hideExpandButtonOnEmpty
                ? record.children.length > 0
                : true
              : props.loadMore && !record.isLeaf
          );

          result.push(record);
        }
        return result;
      };

      return travel(props.data ?? []);
    });

    const validData = computed(() => {
      const travel = (data: TableDataWithRaw[]) =>
        data.filter((record) => {
          if (isValidRecord(record)) {
            if (record.children) {
              record.children = travel(record.children);
            }
            return true;
          }
          return false;
        });

      return Object.keys(computedFilters.value).length > 0
        ? travel(processedData.value)
        : processedData.value;
    });

    const sortedData = computed(() => {
      const data = [...validData.value];
      if (data.length > 0) {
        if (computedSorter.value?.field) {
          const column = dataColumnMap.get(computedSorter.value.field);
          if (column && column.sortable?.sorter !== true) {
            const { field, direction } = computedSorter.value;
            data.sort((a, b) => {
              const valueA = getValueByPath(a.raw, field);
              const valueB = getValueByPath(b.raw, field);

              if (
                column.sortable?.sorter &&
                isFunction(column.sortable.sorter)
              ) {
                return column.sortable.sorter(a.raw, b.raw, {
                  dataIndex: field,
                  direction,
                });
              }

              const result = valueA > valueB ? 1 : -1;
              return direction === 'descend' ? -result : result;
            });
          }
        }

        if (dragState.dragging && dragState.targetPath.length > 0) {
          const target = spliceFromPath(data, dragState.sourcePath);
          spliceFromPath(data, dragState.targetPath, target);
        }
      }
      return data;
    });

    const { page, pageSize, handlePageChange, handlePageSizeChange } =
      usePagination(props, emit);

    const onlyCurrent = computed(
      () => rowSelection.value?.onlyCurrent ?? false
    );

    watch(page, (cur, pre) => {
      if (cur !== pre && onlyCurrent.value) {
        clearSelected();
      }
    });

    const flattenData = computed(() => {
      if (props.pagination && sortedData.value.length > pageSize.value) {
        return sortedData.value.slice(
          (page.value - 1) * pageSize.value,
          page.value * pageSize.value
        );
      }
      return sortedData.value;
    });

    const flattenRawData = computed(() =>
      flattenData.value.map((item) => item.raw)
    );

    const getSummaryData = () => {
      return dataColumns.value.reduce((per, column, index) => {
        if (column.dataIndex) {
          if (index === 0) {
            setValueByPath(per, column.dataIndex, props.summaryText, {
              addPath: true,
            });
          } else {
            let count = 0;
            let isNotNumber = false;
            flattenData.value.forEach((data) => {
              if (column.dataIndex) {
                const _number = getValueByPath(data.raw, column.dataIndex);
                if (isNumber(_number)) {
                  count += _number;
                } else if (!isUndefined(_number) && !isNull(_number)) {
                  isNotNumber = true;
                }
              }
            });
            setValueByPath(per, column.dataIndex, isNotNumber ? '' : count, {
              addPath: true,
            });
          }
        }

        return per;
      }, {} as Record<string, any>);
    };

    const getTableDataWithRaw = (
      data?: TableData[]
    ): TableDataWithRaw[] | undefined => {
      if (data && data.length > 0) {
        return data.map((raw) => {
          return {
            raw,
            key: raw[props.rowKey],
          };
        });
      }
      return undefined;
    };

    const summaryData = computed(() => {
      if (props.summary) {
        if (isFunction(props.summary)) {
          return getTableDataWithRaw(
            props.summary({
              columns: dataColumns.value,
              data: flattenRawData.value,
            })
          );
        }
        return getTableDataWithRaw([getSummaryData()]);
      }
      return undefined;
    });

    const containerScrollLeft = ref(0);

    const alignLeft = ref(true);
    const alignRight = ref(true);

    const setAlignPosition = () => {
      let _alignLeft = true;
      let _alignRight = true;

      const scrollContainer = containerElement.value;

      if (scrollContainer) {
        _alignLeft = containerScrollLeft.value === 0;
        _alignRight =
          Math.ceil(containerScrollLeft.value + scrollContainer.offsetWidth) >=
          scrollContainer.scrollWidth;
      }

      if (_alignLeft !== alignLeft.value) {
        alignLeft.value = _alignLeft;
      }
      if (_alignRight !== alignRight.value) {
        alignRight.value = _alignRight;
      }
    };

    const getTableScrollCls = () => {
      if (alignLeft.value && alignRight.value) {
        return `${prefixCls}-scroll-position-both`;
      }
      if (alignLeft.value) {
        return `${prefixCls}-scroll-position-left`;
      }
      if (alignRight.value) {
        return `${prefixCls}-scroll-position-right`;
      }
      return `${prefixCls}-scroll-position-middle`;
    };

    const getTableFixedCls = () => {
      const cls: string[] = [];
      if (hasLeftFixedColumn.value) {
        cls.push(`${prefixCls}-has-fixed-col-left`);
      }
      if (hasRightFixedColumn.value) {
        cls.push(`${prefixCls}-has-fixed-col-right`);
      }
      return cls;
    };

    const handleScroll = (e: Event) => {
      if (
        (e.target as HTMLDivElement).scrollLeft !== containerScrollLeft.value
      ) {
        containerScrollLeft.value = (e.target as HTMLDivElement).scrollLeft;
      }
      setAlignPosition();
    };

    const onTbodyScroll = (e: Event) => {
      handleScroll(e);
      const { scrollLeft } = e.target as HTMLDivElement;
      if (theadRef.value) {
        theadRef.value.scrollLeft = scrollLeft;
      }
      if (summaryRef.value) {
        summaryRef.value.scrollLeft = scrollLeft;
      }
    };

    const handleRowClick = (record: TableDataWithRaw, ev: Event) => {
      emit('rowClick', record.raw, ev);
    };

    const handleRowDblclick = (record: TableDataWithRaw, ev: Event) => {
      emit('rowDblclick', record.raw, ev);
    };

    const handleRowContextMenu = (record: TableDataWithRaw, ev: Event) => {
      emit('rowContextmenu', record.raw, ev);
    };

    const handleCellClick = (
      record: TableDataWithRaw,
      column: TableColumnData,
      ev: Event
    ) => {
      emit('cellClick', record.raw, column, ev);
    };

    const handleCellMouseEnter = debounce(
      (record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
        emit('cellMouseEnter', record.raw, column, ev);
      },
      30
    );

    const handleCellMouseLeave = debounce(
      (record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
        emit('cellMouseLeave', record.raw, column, ev);
      },
      30
    );

    const handleCellDblclick = (
      record: TableDataWithRaw,
      column: TableColumnData,
      ev: Event
    ) => {
      emit('cellDblclick', record.raw, column, ev);
    };

    const handleCellContextmenu = (
      record: TableDataWithRaw,
      column: TableColumnData,
      ev: Event
    ) => {
      emit('cellContextmenu', record.raw, column, ev);
    };

    const handleHeaderClick = (column: TableColumnData, ev: Event) => {
      emit('headerClick', column, ev);
    };

    const operations = computed(() => {
      const operations: TableOperationColumn[] = [];
      const hasFixedColumn =
        hasLeftFixedColumn.value || hasRightFixedColumn.value;
      let dragHandle: TableOperationColumn | undefined;
      let expand: TableOperationColumn | undefined;
      let selection: TableOperationColumn | undefined;

      if (props.draggable?.type === 'handle') {
        dragHandle = {
          name: 'drag-handle',
          title: props.draggable.title,
          width: props.draggable.width,
          fixed: props.draggable.fixed || hasFixedColumn,
        };
        operations.push(dragHandle);
      }

      if (props.expandable) {
        expand = {
          name: 'expand',
          title: props.expandable.title,
          width: props.expandable.width,
          fixed: props.expandable.fixed || hasFixedColumn,
        };
        operations.push(expand);
      }

      if (props.rowSelection) {
        selection = {
          name:
            props.rowSelection.type === 'radio'
              ? 'selection-radio'
              : 'selection-checkbox',
          title: props.rowSelection.title,
          width: props.rowSelection.width,
          fixed: props.rowSelection.fixed || hasFixedColumn,
        };
        operations.push(selection);
      }
      if (
        !hasLeftFixedDataColumns.value &&
        operations.length > 0 &&
        operations[operations.length - 1].fixed
      ) {
        operations[operations.length - 1].isLastLeftFixed = true;
      }
      const operationsFn = props.components?.operations;

      return isFunction(operationsFn)
        ? operationsFn({ dragHandle, expand, selection })
        : operations;
    });

    const headerStyle = computed(() => {
      if (isScroll.value.x) {
        const style: CSSProperties = {
          width: isNumber(props.scroll?.x)
            ? `${props.scroll?.x}px`
            : props.scroll?.x,
        };
        if (props.scroll?.minWidth) {
          style.minWidth = isNumber(props.scroll.minWidth)
            ? `${props.scroll.minWidth}px`
            : props.scroll.minWidth;
        }
        return style;
      }
      return undefined;
    });

    const contentStyle = computed(() => {
      if (isScroll.value.x && flattenData.value.length > 0) {
        const style: CSSProperties = {
          width: isNumber(props.scroll?.x)
            ? `${props.scroll?.x}px`
            : props.scroll?.x,
        };
        if (props.scroll?.minWidth) {
          style.minWidth = isNumber(props.scroll.minWidth)
            ? `${props.scroll.minWidth}px`
            : props.scroll.minWidth;
        }
        return style;
      }
      return undefined;
    });

    const addColumn = (id: number, column: TableColumnData) => {
      slotColumnMap.set(id, column);
    };

    const removeColumn = (id: number) => {
      slotColumnMap.delete(id);
    };

    provide(
      tableInjectionKey,
      reactive({
        loadMore,
        addLazyLoadData,
        slots,
        sorter: computedSorter,
        filters: computedFilters,
        filterIconAlignLeft,
        resizingColumn,
        checkStrictly,
        currentAllEnabledRowKeys,
        currentSelectedRowKeys,
        addColumn,
        removeColumn,
        onSelectAll: handleSelectAll,
        onSelect: handleSelect,
        onSelectAllLeafs: handleSelectAllLeafs,
        onSorterChange: handleSorterChange,
        onFilterChange: handleFilterChange,
        onThMouseDown: handleThMouseDown,
      })
    );

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-border`]: bordered.value.wrapper,
        [`${prefixCls}-border-cell`]: bordered.value.cell,
        [`${prefixCls}-border-header-cell`]:
          !bordered.value.cell && bordered.value.headerCell,
        [`${prefixCls}-border-body-cell`]:
          !bordered.value.cell && bordered.value.bodyCell,
        [`${prefixCls}-stripe`]: props.stripe,
        [`${prefixCls}-hover`]: props.hoverable,
        [`${prefixCls}-dragging`]: dragState.dragging,
        [`${prefixCls}-type-selection`]: Boolean(props.rowSelection),
        [`${prefixCls}-empty`]: props.data && flattenData.value.length === 0,
        [`${prefixCls}-layout-fixed`]:
          props.tableLayoutFixed ||
          isScroll.value.x ||
          splitTable.value ||
          hasEllipsis.value,
      },
    ]);

    const paginationCls = computed(() => [
      `${prefixCls}-pagination`,
      {
        [`${prefixCls}-pagination-left`]:
          props.pagePosition === 'tl' || props.pagePosition === 'bl',
        [`${prefixCls}-pagination-center`]:
          props.pagePosition === 'top' || props.pagePosition === 'bottom',
        [`${prefixCls}-pagination-right`]:
          props.pagePosition === 'tr' || props.pagePosition === 'br',
        [`${prefixCls}-pagination-top`]: isPaginationTop.value,
      },
    ]);

    const tableCls = computed(() => {
      const cls = getTableFixedCls();

      if (isScroll.value.x) {
        cls.push(getTableScrollCls());
      }

      if (splitTable.value) {
        cls.push(`${prefixCls}-scroll-y`);
      }

      return cls;
    });

    const isVirtualList = computed(() => Boolean(props.virtualListProps));

    const thWidth = ref<Record<string, number>>({});

    const getThWidth = () => {
      const width: Record<string, number> = {};
      for (const key of Object.keys(thRefs.value)) {
        width[key] = thRefs.value[key].offsetWidth;
      }
      thWidth.value = width;
    };

    const hasScrollBar = ref(false);

    const isTbodyHasScrollBar = () => {
      if (tbodyRef.value) {
        return tbodyRef.value.offsetWidth > tbodyRef.value.clientWidth;
      }
      return false;
    };

    const handleTbodyResize = () => {
      const _hasScrollBar = isTbodyHasScrollBar();
      if (hasScrollBar.value !== _hasScrollBar) {
        hasScrollBar.value = _hasScrollBar;
      }
      setAlignPosition();
      getThWidth();
    };

    onMounted(() => {
      hasScrollBar.value = isTbodyHasScrollBar();
      getThWidth();
    });

    const spinProps = computed(() =>
      isObject(props.loading) ? props.loading : { loading: props.loading }
    );

    const renderEmpty = () => {
      return (
        <Tr empty>
          <Td colSpan={dataColumns.value.length + operations.value.length}>
            {slots.empty?.() ??
              configCtx?.slots.empty?.({ component: 'table' }) ?? <Empty />}
          </Td>
        </Tr>
      );
    };

    const renderExpandContent = (record: TableDataWithRaw) => {
      if (record.expand) {
        return isFunction(record.expand) ? record.expand() : record.expand;
      }
      if (slots['expand-row']) {
        return slots['expand-row']({ record: record.raw });
      }
      if (props.expandable?.expandedRowRender) {
        return props.expandable.expandedRowRender(record.raw);
      }

      return undefined;
    };

    const allColumns = computed(() =>
      ([] as (TableColumnData | TableOperationColumn)[]).concat(
        operations.value,
        dataColumns.value
      )
    );

    const spanColumns = computed(() =>
      props.spanAll ? allColumns.value : dataColumns.value
    );

    const { tableSpan, removedCells } = useSpan({
      spanMethod,
      data: flattenData,
      columns: spanColumns,
    });

    const { tableSpan: tableSummarySpan, removedCells: removedSummaryCells } =
      useSpan({
        spanMethod: summarySpanMethod,
        data: flattenData,
        columns: allColumns,
      });

    const getVirtualColumnStyle = (name: string | undefined) => {
      if (!isVirtualList.value || !name || !thWidth.value[name]) {
        return undefined;
      }

      return { width: `${thWidth.value[name]}px` };
    };

    const renderSummaryRow = (record: TableDataWithRaw, rowIndex: number) => {
      return (
        <Tr
          v-slots={{
            tr: slots.tr,
          }}
          key={`table-summary-${rowIndex}`}
          class={[
            `${prefixCls}-tr-summary`,
            isFunction(props.rowClass)
              ? props.rowClass(record.raw, rowIndex)
              : props.rowClass,
          ]}
          // @ts-ignore
          onClick={(ev: Event) => handleRowClick(record, ev)}
        >
          {operations.value.map((operation, index) => {
            const cellId = `${rowIndex}-${index}`;
            const [rowspan, colspan] = tableSummarySpan.value[cellId] ?? [1, 1];

            if (removedSummaryCells.value.includes(cellId)) {
              return null;
            }

            const style = getVirtualColumnStyle(operation.name);

            return (
              <OperationTd
                style={style}
                operationColumn={operation}
                operations={operations.value}
                record={record}
                rowSpan={rowspan}
                colSpan={colspan}
                summary
              />
            );
          })}
          {dataColumns.value.map((column, index) => {
            const cellId = `${rowIndex}-${operations.value.length + index}`;
            const [rowspan, colspan] = tableSummarySpan.value[cellId] ?? [1, 1];

            if (removedSummaryCells.value.includes(cellId)) {
              return null;
            }

            const style = getVirtualColumnStyle(column.dataIndex);

            return (
              <Td
                v-slots={{
                  td: slots.td,
                  cell: slots['summary-cell'],
                }}
                key={`td-${cellId}`}
                style={style}
                rowIndex={rowIndex}
                record={record}
                column={column}
                operations={operations.value}
                dataColumns={dataColumns.value}
                rowSpan={rowspan}
                colSpan={colspan}
                summary
                // @ts-ignore
                onClick={(ev: Event) => handleCellClick(record, column, ev)}
                onDblclick={(ev: Event) =>
                  handleCellDblclick(record, column, ev)
                }
                onMouseenter={(ev: Event) =>
                  handleCellMouseEnter(record, column, ev)
                }
                onMouseleave={(ev: Event) =>
                  handleCellMouseLeave(record, column, ev)
                }
                onContextmenu={(ev: Event) =>
                  handleCellContextmenu(record, column, ev)
                }
              />
            );
          })}
        </Tr>
      );
    };

    const renderSummary = () => {
      if (summaryData.value) {
        return (
          <tfoot>
            {summaryData.value.map((data, index) =>
              renderSummaryRow(data, index)
            )}
          </tfoot>
        );
      }
      return null;
    };

    const renderVirtualListBody = () => {
      return (
        <ClientOnly>
          <VirtualList
            v-slots={{
              item: ({
                item,
                index,
              }: {
                item: TableDataWithRaw;
                index: number;
              }) => renderRecord(item, index),
            }}
            ref={virtualComRef}
            class={`${prefixCls}-body`}
            data={flattenData.value}
            itemKey="_key"
            type="table"
            outerAttrs={{
              class: `${prefixCls}-element`,
              style: contentStyle.value,
            }}
            {...props.virtualListProps}
            onResize={handleTbodyResize}
            onScroll={handleScroll}
          />
        </ClientOnly>
      );
    };

    const renderExpandBtn = (
      record: TableDataWithRaw,
      stopPropagation = true
    ) => {
      const currentKey = record.key;
      const expanded = expandedRowKeys.value.includes(currentKey);

      return (
        <button
          type="button"
          class={`${prefixCls}-expand-btn`}
          onClick={(ev: Event) => {
            handleExpand(currentKey, record.raw);
            if (stopPropagation) {
              ev.stopPropagation();
            }
          }}
        >
          {slots['expand-icon']?.({ expanded, record: record.raw }) ??
            props.expandable?.icon?.(expanded, record.raw) ??
            (expanded ? <IconMinus /> : <IconPlus />)}
        </button>
      );
    };

    const renderExpand = (
      record: TableDataWithRaw,
      {
        indentSize,
        indexPath,
        allowDrag,
        expandContent,
      }: {
        indentSize: number;
        indexPath: number[];
        allowDrag: boolean;
        expandContent: any;
      }
    ) => {
      if (record.hasSubtree) {
        return record.children?.map((item, index) =>
          renderRecord(item, index, {
            indentSize,
            indexPath,
            allowDrag,
          })
        );
      }

      if (expandContent) {
        const scrollContainer = containerElement.value;

        return (
          <Tr key={`${record.key}-expand`} expand>
            <Td
              isFixedExpand={
                hasLeftFixedColumn.value || hasRightFixedColumn.value
              }
              containerWidth={scrollContainer?.clientWidth}
              colSpan={dataColumns.value.length + operations.value.length}
            >
              {expandContent}
            </Td>
          </Tr>
        );
      }

      return null;
    };

    const renderRecord = (
      record: TableDataWithRaw,
      rowIndex: number,
      {
        indentSize = 0,
        indexPath,
        allowDrag = true,
      }: { indentSize?: number; indexPath?: number[]; allowDrag?: boolean } = {}
    ): JSX.Element => {
      const currentKey = record.key;
      const currentPath = (indexPath ?? []).concat(rowIndex);
      const expandContent = renderExpandContent(record);
      const showExpand = expandedRowKeys.value.includes(currentKey);

      const isDragTarget = dragState.sourceKey === record.key;

      const dragSourceEvent = dragType.value
        ? {
            draggable: allowDrag,
            onDragstart: (ev: DragEvent) => {
              if (!allowDrag) return;
              handleDragStart(ev, record.key, currentPath, record.raw);
            },
            onDragend: (ev: DragEvent) => {
              if (!allowDrag) return;
              handleDragEnd(ev);
            },
          }
        : {};

      const dragTargetEvent = dragType.value
        ? {
            onDragenter: (ev: DragEvent) => {
              if (!allowDrag) return;
              handleDragEnter(ev, currentPath);
            },
            onDragover: (ev: DragEvent) => {
              if (!allowDrag) return;
              handleDragover(ev);
            },
            onDrop: (ev: DragEvent) => {
              if (!allowDrag) return;
              handleChange('drag');
              handleDrop(ev);
            },
          }
        : {};

      return (
        <>
          <Tr
            v-slots={{
              tr: slots.tr,
            }}
            key={currentKey}
            class={[
              {
                [`${prefixCls}-tr-draggable`]: dragType.value === 'row',
                [`${prefixCls}-tr-drag`]: isDragTarget,
              },
              isFunction(props.rowClass)
                ? props.rowClass(record, rowIndex)
                : props.rowClass,
            ]}
            rowIndex={rowIndex}
            record={record}
            checked={selectedRowKeys.value?.includes(currentKey)}
            // @ts-ignore
            onClick={(ev: Event) => handleRowClick(record, ev)}
            onDblclick={(ev: Event) => handleRowDblclick(record, ev)}
            onContextmenu={(ev: Event) => handleRowContextMenu(record, ev)}
            {...(dragType.value === 'row' ? dragSourceEvent : {})}
            {...dragTargetEvent}
          >
            {operations.value.map((operation, index) => {
              const cellId = `${rowIndex}-${index}`;
              const [rowspan, colspan] = props.spanAll
                ? tableSpan.value[cellId] ?? [1, 1]
                : [1, 1];

              if (props.spanAll && removedCells.value.includes(cellId)) {
                return null;
              }

              const style = getVirtualColumnStyle(operation.name);

              return (
                <OperationTd
                  v-slots={{
                    'drag-handle-icon': slots['drag-handle-icon'],
                  }}
                  key={`operation-td-${index}`}
                  style={style}
                  operationColumn={operation}
                  operations={operations.value}
                  record={record}
                  hasExpand={Boolean(expandContent)}
                  selectedRowKeys={currentSelectedRowKeys.value}
                  rowSpan={rowspan}
                  colSpan={colspan}
                  renderExpandBtn={renderExpandBtn}
                  {...(dragType.value === 'handle' ? dragSourceEvent : {})}
                />
              );
            })}
            {dataColumns.value.map((column, index) => {
              const cellId = `${rowIndex}-${
                props.spanAll ? operations.value.length + index : index
              }`;
              const [rowspan, colspan] = tableSpan.value[cellId] ?? [1, 1];

              if (removedCells.value.includes(cellId)) {
                return null;
              }

              const extraProps =
                index === 0
                  ? {
                      showExpandBtn: record.hasSubtree,
                      indentSize: record.hasSubtree
                        ? indentSize - 20
                        : indentSize,
                    }
                  : {};

              const style = getVirtualColumnStyle(column.dataIndex);

              return (
                <Td
                  v-slots={{
                    td: slots.td,
                  }}
                  key={`td-${index}`}
                  style={style}
                  rowIndex={rowIndex}
                  record={record}
                  column={column}
                  operations={operations.value}
                  dataColumns={dataColumns.value}
                  rowSpan={rowspan}
                  renderExpandBtn={renderExpandBtn}
                  colSpan={colspan}
                  {...extraProps}
                  // @ts-ignore
                  onClick={(ev: Event) => handleCellClick(record, column, ev)}
                  onDblclick={(ev: Event) =>
                    handleCellDblclick(record, column, ev)
                  }
                  onMouseenter={(ev: Event) =>
                    handleCellMouseEnter(record, column, ev)
                  }
                  onMouseleave={(ev: Event) =>
                    handleCellMouseLeave(record, column, ev)
                  }
                  onContextmenu={(ev: Event) =>
                    handleCellContextmenu(record, column, ev)
                  }
                />
              );
            })}
          </Tr>
          {showExpand &&
            renderExpand(record, {
              indentSize: indentSize + props.indentSize,
              indexPath: currentPath,
              allowDrag: allowDrag && !isDragTarget,
              expandContent,
            })}
        </>
      );
    };

    const renderBody = () => {
      const hasSubData = flattenData.value.some((record) =>
        Boolean(record.hasSubtree)
      );

      return (
        <Tbody
          v-slots={{
            tbody: slots.tbody,
          }}
        >
          {flattenData.value.length > 0
            ? flattenData.value.map((record, index) =>
                renderRecord(record, index, { indentSize: hasSubData ? 20 : 0 })
              )
            : renderEmpty()}
        </Tbody>
      );
    };

    const renderHeader = () => (
      <Thead v-slots={{ thead: slots.thead }}>
        {groupColumns.value.map((row, index) => (
          <Tr key={`header-row-${index}`}>
            {index === 0 &&
              operations.value.map((operation, index) => (
                <OperationTh
                  key={`operation-th-${index}`}
                  // @ts-ignore
                  ref={(ins: ComponentPublicInstance) => {
                    if (ins?.$el && operation.name) {
                      thRefs.value[operation.name] = ins.$el;
                    }
                  }}
                  operationColumn={operation}
                  operations={operations.value}
                  selectAll={Boolean(
                    operation.name === 'selection-checkbox' &&
                      props.rowSelection?.showCheckedAll
                  )}
                  rowSpan={groupColumns.value.length}
                />
              ))}
            {row.map((column, index) => {
              const resizable =
                props.columnResizable &&
                Boolean(column.dataIndex) &&
                index < row.length - 1;

              return (
                <Th
                  key={`th-${index}`}
                  // @ts-ignore
                  ref={(ins: ComponentPublicInstance) => {
                    if (ins?.$el && column.dataIndex) {
                      thRefs.value[column.dataIndex] = ins.$el;
                    }
                  }}
                  v-slots={{ th: slots.th }}
                  column={column}
                  operations={operations.value}
                  dataColumns={dataColumns.value}
                  resizable={resizable}
                  onClick={(ev: Event) => handleHeaderClick(column, ev)}
                />
              );
            })}
          </Tr>
        ))}
      </Thead>
    );

    const renderContent = () => {
      if (splitTable.value) {
        const style: CSSProperties = {};
        if (hasScrollBar.value) {
          style.overflowY = 'scroll';
        }
        if (isNumber(props.stickyHeader)) {
          style.top = `${props.stickyHeader}px`;
        }

        const Component = displayScrollbar.value ? Scrollbar : 'div';

        return (
          <>
            {props.showHeader && (
              <Component
                ref={theadComRef}
                class={[
                  `${prefixCls}-header`,
                  { [`${prefixCls}-header-sticky`]: props.stickyHeader },
                ]}
                style={style}
                {...(scrollbar.value
                  ? {
                      hide: flattenData.value.length !== 0,
                      disableVertical: true,
                      ...scrollbarProps.value,
                    }
                  : undefined)}
              >
                <table
                  class={`${prefixCls}-element`}
                  style={headerStyle.value}
                  cellpadding={0}
                  cellspacing={0}
                >
                  <ColGroup
                    dataColumns={dataColumns.value}
                    operations={operations.value}
                    columnWidth={columnWidth}
                  />
                  {renderHeader()}
                </table>
              </Component>
            )}
            <ResizeObserver onResize={handleTbodyResize}>
              {isVirtualList.value ? (
                <VirtualList
                  v-slots={{
                    item: ({
                      item,
                      index,
                    }: {
                      item: TableDataWithRaw;
                      index: number;
                    }) => renderRecord(item, index),
                  }}
                  ref={(ins: any) => {
                    if (ins?.$el) tbodyRef.value = ins.$el;
                  }}
                  class={`${prefixCls}-body`}
                  data={flattenData.value}
                  itemKey="_key"
                  component={{
                    list: 'table',
                    content: 'tbody',
                  }}
                  listAttrs={{
                    class: `${prefixCls}-element`,
                    style: contentStyle.value,
                  }}
                  paddingPosition="list"
                  {...props.virtualListProps}
                  onScroll={onTbodyScroll}
                />
              ) : (
                <Component
                  ref={tbodyComRef}
                  class={`${prefixCls}-body`}
                  style={{
                    maxHeight: isNumber(props.scroll?.y)
                      ? `${props.scroll?.y}px`
                      : '100%',
                  }}
                  {...(scrollbar.value
                    ? {
                        outerStyle: { display: 'flex', minHeight: '0' },
                        ...scrollbarProps.value,
                      }
                    : undefined)}
                  onScroll={onTbodyScroll}
                >
                  <table
                    class={`${prefixCls}-element`}
                    style={contentStyle.value}
                    cellpadding={0}
                    cellspacing={0}
                  >
                    {flattenData.value.length !== 0 && (
                      <ColGroup
                        dataColumns={dataColumns.value}
                        operations={operations.value}
                        columnWidth={columnWidth}
                      />
                    )}
                    {renderBody()}
                  </table>
                </Component>
              )}
            </ResizeObserver>
            {summaryData.value && summaryData.value.length && (
              <div
                ref={summaryRef}
                class={`${prefixCls}-tfoot`}
                style={{
                  overflowY: hasScrollBar.value ? 'scroll' : 'hidden',
                }}
              >
                <table
                  class={`${prefixCls}-element`}
                  style={contentStyle.value}
                  cellpadding={0}
                  cellspacing={0}
                >
                  <ColGroup
                    dataColumns={dataColumns.value}
                    operations={operations.value}
                    columnWidth={columnWidth}
                  />
                  {renderSummary()}
                </table>
              </div>
            )}
          </>
        );
      }

      return (
        <ResizeObserver onResize={() => setAlignPosition()}>
          <table
            class={`${prefixCls}-element`}
            cellpadding={0}
            cellspacing={0}
            style={contentStyle.value}
          >
            <ColGroup
              dataColumns={dataColumns.value}
              operations={operations.value}
              columnWidth={columnWidth}
            />
            {props.showHeader && renderHeader()}
            {renderBody()}
            {summaryData.value && summaryData.value.length && renderSummary()}
          </table>
        </ResizeObserver>
      );
    };

    const renderTable = (content?: Slot) => {
      const style = props.scroll?.maxHeight
        ? { maxHeight: props.scroll.maxHeight }
        : undefined;

      const Component = displayScrollbar.value ? Scrollbar : 'div';

      return (
        <>
          <div class={[`${prefixCls}-container`, tableCls.value]}>
            <Component
              ref={contentComRef}
              class={[
                `${prefixCls}-content`,
                {
                  [`${prefixCls}-content-scroll-x`]: !splitTable.value,
                },
              ]}
              style={style}
              {...(scrollbar.value
                ? { outerStyle: { height: '100%' }, ...scrollbarProps.value }
                : undefined)}
              onScroll={handleScroll}
            >
              {content ? (
                <table
                  class={`${prefixCls}-element`}
                  cellpadding={0}
                  cellspacing={0}
                >
                  {content()}
                </table>
              ) : (
                renderContent()
              )}
            </Component>
          </div>
          {slots.footer && (
            <div class={`${prefixCls}-footer`}>{slots.footer()}</div>
          )}
        </>
      );
    };

    const renderPagination = () => {
      const paginationProps = isObject(props.pagination)
        ? omit(props.pagination, [
            'current',
            'pageSize',
            'defaultCurrent',
            'defaultPageSize',
          ])
        : {};

      return (
        <div class={paginationCls.value}>
          {slots['pagination-left']?.()}
          <Pagination
            total={validData.value.length}
            current={page.value}
            pageSize={pageSize.value}
            onChange={(page: number) => {
              handlePageChange(page);
              handleChange('pagination');
            }}
            onPageSizeChange={(pageSize: number) => {
              handlePageSizeChange(pageSize);
              handleChange('pagination');
            }}
            {...paginationProps}
          />
          {slots['pagination-right']?.()}
        </div>
      );
    };

    const style = computed<CSSProperties | undefined>(() => {
      if (isString(props.scroll?.y)) {
        return { height: props.scroll?.y };
      }
      return undefined;
    });

    const render = () => {
      if (slots.default) {
        return <div class={cls.value}>{renderTable(slots.default)}</div>;
      }
      children.value = slots.columns?.();
      // fix #1724 sortedData.value.length > 0
      return (
        <div class={cls.value} style={style.value}>
          {children.value}
          <Spin {...spinProps.value}>
            {props.pagination !== false &&
              (flattenData.value.length > 0 || sortedData.value.length > 0) &&
              isPaginationTop.value &&
              renderPagination()}
            {renderTable()}
            {props.pagination !== false &&
              (flattenData.value.length > 0 || sortedData.value.length > 0) &&
              !isPaginationTop.value &&
              renderPagination()}
          </Spin>
        </div>
      );
    };

    return {
      render,
      selfExpand: expand,
      selfExpandAll: expandAll,
      selfSelect: select,
      selfSelectAll: selectAll,
      selfResetFilters: resetFilters,
      selfClearFilters: clearFilters,
      selfResetSorters: resetSorters,
      selfClearSorters: clearSorters,
    };
  },
  methods: {
    /**
     * @zh 设置全选状态
     * @en Set select all state
     * @param { boolean } checked
     * @public
     * @version 2.22.0
     */
    selectAll(checked?: boolean) {
      return this.selfSelectAll(checked);
    },
    /**
     * @zh 设置行选择器状态
     * @en Set row selector state
     * @param { string | number | (string | number)[] } rowKey
     * @param { boolean } checked
     * @public
     * @version 2.31.0
     */
    select(rowKey: string | number | (string | number)[], checked?: boolean) {
      return this.selfSelect(rowKey, checked);
    },
    /**
     * @zh 设置全部展开状态
     * @en Set all expanded state
     * @param { boolean } checked
     * @public
     * @version 2.31.0
     */
    expandAll(checked?: boolean) {
      return this.selfExpandAll(checked);
    },
    /**
     * @zh 设置展开状态
     * @en Set select all state
     * @param { string | number | (string | number)[] } rowKey
     * @param { boolean } checked
     * @public
     * @version 2.31.0
     */
    expand(rowKey: string | number | (string | number)[], checked?: boolean) {
      return this.selfExpand(rowKey, checked);
    },
    /**
     * @zh 重置列的筛选器
     * @en Reset the filter for columns
     * @param { string | string[] } dataIndex
     * @public
     * @version 2.31.0
     */
    resetFilters(dataIndex?: string | string[]) {
      return this.selfResetFilters(dataIndex);
    },
    /**
     * @zh 清空列的筛选器
     * @en Clear the filter for columns
     * @param { string | string[] } dataIndex
     * @public
     * @version 2.31.0
     */
    clearFilters(dataIndex?: string | string[]) {
      return this.selfClearFilters(dataIndex);
    },
    /**
     * @zh 重置列的排序
     * @en Reset the order of columns
     * @public
     * @version 2.31.0
     */
    resetSorters() {
      return this.selfResetSorters();
    },
    /**
     * @zh 清空列的排序
     * @en Clear the order of columns
     * @public
     * @version 2.31.0
     */
    clearSorters() {
      return this.selfClearSorters();
    },
  },
  render() {
    return this.render();
  },
});
