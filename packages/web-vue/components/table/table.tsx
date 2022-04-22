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
import { off, on } from '../_utils/dom';
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
import Thead from './table-thead.vue';
import Tbody from './table-tbody';
import Tr from './table-tr';
import Th from './table-th';
import Td from './table-td';
import OperationTh from './table-operation-th';
import OperationTd from './table-operation-td';
import VirtualList from '../_components/virtual-list/virtual-list.vue';
import ResizeObserver from '../_components/resize-observer';
import { VirtualListProps } from '../_components/virtual-list/interface';
import { omit } from '../_utils/omit';
import { EmitType } from '../_utils/types';
import { configProviderInjectionKey } from '../config-provider/context';
import { useDrag } from './hooks/use-drag';
import { useColumnResize } from './hooks/use-column-resize';
import { tableInjectionKey } from './context';
import { useFilter } from './hooks/use-filter';
import { useSorter } from './hooks/use-sorter';
import ClientOnly from '../_components/client-only';
import { getValueByPath } from '../_utils/get-value-by-path';

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
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否隐藏表头
     * @en Whether to hide the header
     */
    hideHeader: {
      type: Boolean,
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
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动
     * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling
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
     * @zh 表格行元素的类名
     * @en The class name of the table row element
     * @version 2.16.0
     */
    rowClass: {
      type: [String, Array, Object],
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
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 默认已选择的行（非受控模式）优先于 `rowSelection`
     * @en The selected row by default (uncontrolled mode) takes precedence over `rowSelection`
     * @version 2.25.0
     */
    defaultSelectedKeys: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 显示的展开行、子树（受控模式）优先于 `expandable`
     * @en Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`
     * @version 2.25.0
     */
    expandedKeys: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 默认显示的展开行、子树（非受控模式）优先于 `expandable`
     * @en Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`
     * @version 2.25.0
     */
    defaultExpandedKeys: {
      type: Array as PropType<string[]>,
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
    // for JSX
    onExpand: {
      type: [Function, Array] as PropType<EmitType<(rowKey: string) => void>>,
    },
    onExpandedChange: {
      type: [Function, Array] as PropType<
        EmitType<(rowKeys: string[]) => void>
      >,
    },
    onSelect: {
      type: [Function, Array] as PropType<
        (rowKeys: string[], rowKey: string) => void
      >,
    },
    onSelectAll: {
      type: [Function, Array] as PropType<(checked: boolean) => void>,
    },
    onSelectionChange: {
      type: [Function, Array] as PropType<(rowKeys: string[]) => void>,
    },
    onSorterChange: {
      type: [Function, Array] as PropType<
        (dataIndex: string, direction: string) => void
      >,
    },
    onFilterChange: {
      type: [Function, Array] as PropType<
        (dataIndex: string, filteredValues: string[]) => void
      >,
    },
    onPageChange: {
      type: [Function, Array] as PropType<(page: number) => void>,
    },
    onPageSizeChange: {
      type: [Function, Array] as PropType<(pageSize: number) => void>,
    },
    onCellClick: {
      type: [Function, Array] as PropType<
        (record: TableData, column: TableColumnData) => void
      >,
    },
    onRowClick: {
      type: [Function, Array] as PropType<(record: TableData) => void>,
    },
    onHeaderClick: {
      type: [Function, Array] as PropType<(column: TableColumnData) => void>,
    },
  },
  emits: [
    'update:selectedKeys',
    'update:expandedKeys',
    /**
     * @zh 点击展开行时触发
     * @en Triggered when a row is clicked to expand
     * @param {string} rowKey
     */
    'expand',
    /**
     * @zh 已展开的数据行发生改变时触发
     * @en Triggered when the expanded data row changes
     * @param {string[]} rowKeys
     */
    'expandedChange',
    /**
     * @zh 点击行选择器时触发
     * @en Triggered when the row selector is clicked
     * @param {string[]} rowKeys
     * @param {string} rowKey
     */
    'select',
    /**
     * @zh 点击全选选择器时触发
     * @en Triggered when the select all selector is clicked
     * @param {boolean} checked
     */
    'selectAll',
    /**
     * @zh 已选择的数据行发生改变时触发
     * @en Triggered when the selected data row changes
     * @param {string[]} rowKeys
     */
    'selectionChange',
    /**
     * @zh 排序规则发生改变时触发
     * @en Triggered when the collation changes
     * @param {string} dataIndex
     * @param {string} direction
     */
    'sorterChange',
    /**
     * @zh 过滤选项发生改变时触发
     * @en Triggered when the filter options are changed
     * @param {string} dataIndex
     * @param {string[]} filteredValues
     */
    'filterChange',
    /**
     * @zh 表格分页发生改变时触发
     * @en Triggered when the table pagination changes
     * @param {number} page
     */
    'pageChange',
    /**
     * @zh 表格每页数据数量发生改变时触发
     * @en Triggered when the number of data per page of the table changes
     * @param {number} pageSize
     */
    'pageSizeChange',
    /**
     * @zh 表格数据发生变化时触发
     * @param {TableData[]} data
     * @param {TableChangeExtra} extra
     */
    'change',
    /**
     * @zh 点击单元格时触发
     * @en Triggered when a cell is clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     */
    'cellClick',
    /**
     * @zh 点击行数据时触发
     * @en Triggered when row data is clicked
     * @param {TableData} record
     */
    'rowClick',
    /**
     * @zh 点击表头数据时触发
     * @en Triggered when the header data is clicked
     * @param {TableColumnData} column
     */
    'headerClick',
  ],
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
   * @version 2.16.0
   */
  /**
   * @zh 自定义 td 元素
   * @en Custom td element
   * @slot td
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
    } = toRefs(props);
    const prefixCls = getPrefixCls('table');
    const bordered = computed(() => {
      if (isObject(props.bordered)) {
        return { ...DEFAULT_BORDERED, ...props.bordered };
      }
      return { ...DEFAULT_BORDERED, wrapper: props.bordered };
    });

    // whether to scroll
    const isScroll = computed(() => {
      const x = Boolean(props.scroll?.x || props.scroll?.minWidth);
      const y = Boolean(props.scroll?.y || props.scroll?.maxHeight);
      return { x, y };
    });

    const theadRef = ref<HTMLElement>();
    const tbodyRef = ref<HTMLElement>();
    const summaryRef = ref<HTMLElement>();
    const thRefs = ref<Record<string, HTMLElement>>({});

    const handleBodyScroll = () => {
      if (theadRef.value && tbodyRef.value) {
        theadRef.value.scrollLeft = tbodyRef.value.scrollLeft;
      }
    };

    onMounted(() => {
      watch(isScroll, ({ y }, _, onInvalidate) => {
        onInvalidate(() => {
          if (tbodyRef.value) {
            off(tbodyRef.value, 'scroll', handleBodyScroll);
          }
        });
        if (y && tbodyRef.value && theadRef.value) {
          on(tbodyRef.value, 'scroll', handleBodyScroll);
        }
      });
    });

    const slotColumnMap = reactive(new Map<number, TableColumnData>());
    const slotColumns = ref<TableColumnData[]>();

    watch(slotColumnMap, (slotColumnMap) => {
      if (slotColumnMap.size > 0) {
        slotColumns.value = Array.from(slotColumnMap.values()).sort((a, b) => {
          if (isNumber(a.index) && isNumber(b.index)) {
            return a.index - b.index;
          }
          return 0;
        });
      } else {
        slotColumns.value = undefined;
      }
    });

    // 拆解分组后的数据表头信息
    const dataColumnMap = new Map<string, TableColumnData>();
    const dataColumns = ref<TableColumnData[]>([]);
    const groupColumns = ref<TableColumnData[][]>([]);

    watch(
      [columns, slotColumnMap],
      ([columns, _]) => {
        const result = getGroupColumns(
          slotColumns.value ?? columns ?? [],
          dataColumnMap
        );
        dataColumns.value = result.dataColumns;
        groupColumns.value = result.groupColumns;
      },
      { immediate: true }
    );

    const isPaginationTop = computed(() =>
      ['tl', 'top', 'tr'].includes(props.pagePosition)
    );

    const hasLeftFixedColumn = ref(false);
    const hasRightFixedColumn = ref(false);

    watchEffect(() => {
      let _hasLeftFixedColumn = false;
      let _hasRightFixedColumn = false;
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
    });

    const hasEllipsis = computed(() => {
      for (const col of dataColumns.value) {
        if (col.ellipsis) {
          return true;
        }
      }
      return false;
    });

    const { _filters, computedFilters } = useFilter({ columns: dataColumns });
    const { _sorter, computedSorter } = useSorter({ columns: dataColumns });

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
      emit('change', flattenRawData.value, extra);
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

    const disabledKeys = new Set();

    const allRowKeys = computed(() => {
      const allRowKeys: string[] = [];
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
      const keys: string[] = [];
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
      const keys: string[] = [];

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
      handleSelectAll,
    } = useRowSelection({
      selectedKeys,
      defaultSelectedKeys,
      rowSelection,
      currentAllRowKeys,
      currentAllEnabledRowKeys,
      emit,
    });

    const { expandedRowKeys, handleExpand } = useExpand({
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

    const isValidRecord = (record: TableData) => {
      for (const field of Object.keys(computedFilters.value)) {
        const filteredValues = computedFilters.value[field];
        const column = dataColumnMap.get(field);
        if (column && column.filterable?.filter && filteredValues.length > 0) {
          const result = column.filterable?.filter(filteredValues, record);
          if (!result) {
            return result;
          }
        }
      }
      return true;
    };

    const {
      dragState,
      handleDragStart,
      handleDragEnter,
      handleDragLeave,
      handleDragover,
      handleDragEnd,
      handleDrop,
    } = useDrag();

    const { resizingColumn, columnWidth, handleThMouseDown } =
      useColumnResize(thRefs);

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
          if (
            props.loadMore &&
            !_record.isLeaf &&
            !_record.children &&
            lazyLoadData[record.key]
          ) {
            record.children = travel(lazyLoadData[record.key]);
          } else if (_record.children) {
            record.children = travel(_record.children);
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
          if (isValidRecord(record.raw)) {
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
              const valueA = a.raw[field];
              const valueB = b.raw[field];

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
            per[column.dataIndex] = props.summaryText;
          } else {
            let count = 0;
            let isNotNumber = false;
            flattenData.value.forEach((data) => {
              if (column.dataIndex) {
                if (isNumber(data.raw[column.dataIndex])) {
                  count += data.raw[column.dataIndex];
                } else if (
                  !isUndefined(data.raw[column.dataIndex]) &&
                  !isNull(data.raw[column.dataIndex])
                ) {
                  isNotNumber = true;
                }
              }
            });
            per[column.dataIndex] = isNotNumber ? '' : count;
          }
        }

        return per;
      }, {} as Record<string, any>);
    };

    const summaryData = computed(() => {
      if (props.summary) {
        if (isFunction(props.summary)) {
          return props.summary({
            columns: dataColumns.value,
            data: flattenRawData.value,
          });
        }
        return [getSummaryData()];
      }
      return undefined;
    });

    const containerRef = ref<HTMLDivElement>();
    const containerScrollLeft = ref(0);

    const alignLeft = ref(true);
    const alignRight = ref(true);

    const setAlignPosition = () => {
      let _alignLeft = true;
      let _alignRight = true;

      const scrollContainer = isScroll.value.y
        ? tbodyRef.value
        : containerRef.value;

      if (scrollContainer) {
        _alignLeft = containerScrollLeft.value === 0;
        _alignRight =
          containerScrollLeft.value + scrollContainer.offsetWidth >=
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
      const cls = [];
      if (hasLeftFixedColumn.value) {
        cls.push(`${prefixCls}-has-fixed-col-left`);
      }
      if (hasRightFixedColumn.value) {
        cls.push(`${prefixCls}-has-fixed-col-right`);
      }
      return cls;
    };

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollLeft !== containerScrollLeft.value) {
        containerScrollLeft.value = target.scrollLeft;
      }
      if (isScroll.value.y || props.virtualListProps) {
        if (theadRef.value) {
          theadRef.value.scrollLeft = target.scrollLeft;
        }
        if (summaryRef.value) {
          summaryRef.value.scrollLeft = target.scrollLeft;
        }
      }
      setAlignPosition();
    };

    const handleRowClick = (record: TableData, ev: Event) => {
      emit('rowClick', record, ev);
    };

    const handleCellClick = (
      record: TableData,
      column: TableColumnData,
      ev: Event
    ) => {
      emit('cellClick', record, column, ev);
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
        addColumn,
        removeColumn,
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
        [`${prefixCls}-type-selection`]: props.rowSelection,
        [`${prefixCls}-empty`]: props.data && flattenData.value.length === 0,
        [`${prefixCls}-layout-fixed`]:
          props.tableLayoutFixed ||
          isScroll.value.x ||
          isScroll.value.y ||
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

      if (isScroll.value.y || isVirtualList.value) {
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
        <Tr isEmptyRow>
          <Td colSpan={dataColumns.value.length + operations.value.length}>
            {slots.empty?.() ?? <Empty />}
          </Td>
        </Tr>
      );
    };

    const renderExpandContent = (record: TableDataWithRaw) => {
      if (record.expand) {
        return isFunction(record.expand) ? record.expand() : record.expand;
      }
      if (slots['expand-row']) {
        return slots['expand-row']({ record });
      }
      if (props.expandable?.expandedRowRender) {
        return props.expandable.expandedRowRender(record);
      }

      return undefined;
    };

    // [row, column]
    const tableSpan = computed(() => {
      const data: Record<string, [number, number]> = {};
      if (props.spanMethod) {
        const columns = props.spanAll
          ? ([] as (TableColumnData | TableOperationColumn)[]).concat(
              operations.value,
              dataColumns.value
            )
          : dataColumns.value;

        flattenData.value.forEach((record, rowIndex) => {
          columns.forEach((column, columnIndex) => {
            const { rowspan = 1, colspan = 1 } =
              props.spanMethod?.({
                record: record.raw,
                column,
                rowIndex,
                columnIndex,
              }) ?? {};
            if (rowspan > 1 || colspan > 1) {
              data[`${rowIndex}-${columnIndex}`] = [rowspan, colspan];
            }
          });
        });
      }

      return data;
    });

    const removedCells = computed(() => {
      const data: string[] = [];
      for (const indexKey of Object.keys(tableSpan.value)) {
        const indexArray = indexKey.split('-').map((item) => Number(item));
        const span = tableSpan.value[indexKey];
        for (let i = 1; i < span[0]; i++) {
          data.push(`${indexArray[0] + i}-${indexArray[1]}`);
          for (let j = 1; j < span[1]; j++) {
            data.push(`${indexArray[0] + i}-${indexArray[1] + j}`);
          }
        }
        for (let i = 1; i < span[1]; i++) {
          data.push(`${indexArray[0]}-${indexArray[1] + i}`);
        }
      }
      return data;
    });

    // copy
    // [row, column]
    const tableSummarySpan = computed(() => {
      const data: Record<string, [number, number]> = {};
      if (props.summarySpanMethod) {
        const columns = (
          [] as (TableColumnData | TableOperationColumn)[]
        ).concat(operations.value, dataColumns.value);
        flattenData.value.forEach((record, rowIndex) => {
          columns.forEach((column, columnIndex) => {
            const { rowspan = 1, colspan = 1 } =
              props.summarySpanMethod?.({
                record: record.raw,
                column,
                rowIndex,
                columnIndex,
              }) ?? {};
            if (rowspan > 1 || colspan > 1) {
              data[`${rowIndex}-${columnIndex}`] = [rowspan, colspan];
            }
          });
        });
      }
      return data;
    });

    const removedSummaryCells = computed(() => {
      const data: string[] = [];
      for (const indexKey of Object.keys(tableSummarySpan.value)) {
        const indexArray = indexKey.split('-').map((item) => Number(item));
        const span = tableSummarySpan.value[indexKey];
        for (let i = 1; i < span[0]; i++) {
          data.push(`${indexArray[0] + i}-${indexArray[1]}`);
          for (let j = 1; j < span[1]; j++) {
            data.push(`${indexArray[0] + i}-${indexArray[1] + j}`);
          }
        }
        for (let i = 1; i < span[1]; i++) {
          data.push(`${indexArray[0]}-${indexArray[1] + i}`);
        }
      }
      return data;
    });

    const renderSummaryRow = (record: TableData, rowIndex: number) => {
      return (
        <Tr
          class={[props.rowClass, `${prefixCls}-tr-summary`]}
          key={`table-summary-${rowIndex}`}
          v-slots={{
            tr: slots.tr,
          }}
          onClick={(ev: Event) => handleRowClick(record, ev)}
        >
          {operations.value.map((operation, index) => {
            const cellId = `${rowIndex}-${index}`;
            const [rowspan, colspan] = tableSummarySpan.value[cellId] ?? [1, 1];

            if (removedSummaryCells.value.includes(cellId)) {
              return null;
            }

            const style =
              isVirtualList.value &&
              operation.name &&
              thWidth.value[operation.name]
                ? { width: `${thWidth.value[operation.name]}px` }
                : undefined;

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

            const style =
              isVirtualList.value &&
              column.dataIndex &&
              thWidth.value[column.dataIndex]
                ? { width: `${thWidth.value[column.dataIndex]}px` }
                : undefined;

            return (
              <Td
                key={`td-${cellId}`}
                v-slots={{
                  td: slots.td,
                }}
                style={style}
                rowIndex={rowIndex}
                record={record}
                column={column}
                operations={operations.value}
                dataColumns={dataColumns.value}
                rowSpan={rowspan}
                colSpan={colspan}
                onClick={(ev: Event) => handleCellClick(record, column, ev)}
              >
                {slots['summary-cell']?.({
                  record,
                  column,
                  rowIndex,
                }) ?? String(getValueByPath(record, column.dataIndex) ?? '')}
              </Td>
            );
          })}
        </Tr>
      );
    };

    const renderSummary = () => {
      if (summaryData.value) {
        return summaryData.value.map((data, index) =>
          renderSummaryRow(data, index)
        );
      }
      return null;
    };

    const virtualListRef = ref();

    watch(virtualListRef, (instance) => {
      tbodyRef.value = instance.$el;
    });

    const renderVirtualListBody = () => {
      return (
        <ClientOnly>
          <VirtualList
            ref={virtualListRef}
            class={`${prefixCls}-body`}
            itemKey="_key"
            type="table"
            {...props.virtualListProps}
            data={flattenData.value}
            v-slots={{
              item: ({
                item,
                index,
              }: {
                item: TableDataWithRaw;
                index: number;
              }) => renderRecord(item, index),
            }}
            onResize={() => {
              handleTbodyResize();
            }}
            onScroll={handleScroll}
            outerAttrs={{ style: contentStyle.value }}
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
            handleExpand(currentKey);
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

    const dragType = computed(() => {
      if (props.draggable) {
        if (props.draggable?.type === 'handle') {
          return 'handle';
        }
        return 'row';
      }
      return 'none';
    });

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

      const scrollContainer = isScroll.value.y
        ? tbodyRef.value
        : containerRef.value;

      const isDragTarget = dragState.sourceKey === record.key;

      const dragSourceEvent =
        dragType.value !== 'none' && allowDrag
          ? {
              draggable: true,
              onDragstart: (ev: DragEvent) =>
                handleDragStart(ev, record.key, currentPath, record.raw),
              onDragend: (ev: DragEvent) => handleDragEnd(ev),
            }
          : {};

      const dragTargetEvent =
        dragType.value !== 'none' && allowDrag
          ? {
              onDragenter: (ev: DragEvent) => handleDragEnter(ev, currentPath),
              onDragleave: (ev: DragEvent) => handleDragLeave(ev),
              onDragover: (ev: DragEvent) => handleDragover(ev),
              onDrop: (ev: DragEvent) => {
                handleChange('drag');
                handleDrop(ev);
              },
            }
          : {};

      return (
        <>
          <Tr
            {...(dragType.value === 'row' ? dragSourceEvent : {})}
            {...dragTargetEvent}
            class={[
              {
                [`${prefixCls}-tr-draggable`]: dragType.value === 'row',
                [`${prefixCls}-tr-drag`]: isDragTarget,
              },
              props.rowClass,
            ]}
            key={currentKey}
            v-slots={{
              tr: slots.tr,
            }}
            checked={selectedRowKeys.value?.includes(currentKey)}
            onClick={(ev: Event) => handleRowClick(record.raw, ev)}
          >
            {operations.value.map((operation, index) => {
              const cellId = `${rowIndex}-${index}`;
              const [rowspan, colspan] = props.spanAll
                ? tableSpan.value[cellId] ?? [1, 1]
                : [1, 1];

              if (props.spanAll && removedCells.value.includes(cellId)) {
                return null;
              }

              const style =
                isVirtualList.value &&
                operation.name &&
                thWidth.value[operation.name]
                  ? { width: `${thWidth.value[operation.name]}px` }
                  : undefined;

              return (
                <OperationTd
                  key={`operation-td-${index}`}
                  v-slots={{
                    'drag-handle-icon': slots['drag-handle-icon'],
                  }}
                  style={style}
                  operationColumn={operation}
                  operations={operations.value}
                  record={record}
                  rowKey={rowKey.value}
                  hasExpand={Boolean(expandContent)}
                  selectedRowKeys={selectedRowKeys.value}
                  rowSpan={rowspan}
                  colSpan={colspan}
                  renderExpandBtn={renderExpandBtn}
                  onSelect={handleSelect}
                  onExpand={handleExpand}
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

              const style =
                isVirtualList.value &&
                column.dataIndex &&
                thWidth.value[column.dataIndex]
                  ? { width: `${thWidth.value[column.dataIndex]}px` }
                  : undefined;

              return (
                <Td
                  key={`td-${index}`}
                  v-slots={{
                    td: slots.td,
                  }}
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
                  onClick={(ev: Event) =>
                    handleCellClick(record.raw, column, ev)
                  }
                />
              );
            })}
          </Tr>
          {showExpand &&
            (record.hasSubtree
              ? record.children?.map((item, index) =>
                  renderRecord(item, index, {
                    indentSize: indentSize + props.indentSize,
                    indexPath: currentPath,
                    allowDrag: allowDrag && !isDragTarget,
                  })
                )
              : Boolean(expandContent) && (
                  <Tr isExpandRow key={`${currentKey}-expand`}>
                    <Td
                      isFixedExpand={
                        hasLeftFixedColumn.value || hasRightFixedColumn.value
                      }
                      containerWidth={scrollContainer?.clientWidth}
                      colSpan={
                        dataColumns.value.length + operations.value.length
                      }
                    >
                      {expandContent}
                    </Td>
                  </Tr>
                ))}
        </>
      );
    };

    const renderFooter = () => {
      return <tfoot>{renderSummary()}</tfoot>;
    };

    const renderBody = () => {
      const hasSubData = flattenData.value.some((record) =>
        Boolean(record.children)
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
      <Thead>
        {groupColumns.value.map((row, index) => (
          <Tr key={`header-row-${index}`}>
            {index === 0 &&
              operations.value.map((operation, index) => (
                <OperationTh
                  // @ts-ignore
                  ref={(ins: ComponentPublicInstance) => {
                    if (ins?.$el && operation.name) {
                      thRefs.value[operation.name] = ins.$el;
                    }
                  }}
                  key={`operation-th-${index}`}
                  operationColumn={operation}
                  operations={operations.value}
                  selectAll={Boolean(
                    operation.name === 'selection-checkbox' &&
                      props.rowSelection?.showCheckedAll
                  )}
                  rowSpan={groupColumns.value.length}
                  selectedNumber={currentSelectedRowKeys.value.length}
                  totalNumber={currentAllRowKeys.value.length}
                  totalEnabledNumber={currentAllEnabledRowKeys.value.length}
                  onSelectAll={handleSelectAll}
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
      if (
        isScroll.value.y ||
        isVirtualList.value ||
        (isScroll.value.x && flattenData.value.length === 0)
      ) {
        const style: CSSProperties = {
          overflowY: hasScrollBar.value ? 'scroll' : 'hidden',
        };

        return (
          <>
            {props.showHeader && (
              <div ref={theadRef} class={`${prefixCls}-header`} style={style}>
                <table
                  cellpadding={0}
                  cellspacing={0}
                  style={headerStyle.value}
                >
                  <ColGroup
                    dataColumns={dataColumns.value}
                    operations={operations.value}
                    columnWidth={columnWidth}
                  />
                  {renderHeader()}
                </table>
              </div>
            )}
            {isVirtualList.value ? (
              renderVirtualListBody()
            ) : (
              <ResizeObserver onResize={handleTbodyResize}>
                <div
                  ref={tbodyRef}
                  class={`${prefixCls}-body`}
                  style={{
                    maxHeight: isNumber(props.scroll?.y)
                      ? `${props.scroll?.y}px`
                      : '100%',
                  }}
                  onScroll={handleScroll}
                >
                  <table
                    cellpadding={0}
                    cellspacing={0}
                    style={contentStyle.value}
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
                </div>
              </ResizeObserver>
            )}
            {summaryData.value && summaryData.value.length && (
              <div ref={summaryRef} class={`${prefixCls}-tfoot`} style={style}>
                <table
                  cellpadding={0}
                  cellspacing={0}
                  style={contentStyle.value}
                >
                  <ColGroup
                    dataColumns={dataColumns.value}
                    operations={operations.value}
                    columnWidth={columnWidth}
                  />
                  {renderFooter()}
                </table>
              </div>
            )}
          </>
        );
      }

      return (
        <ResizeObserver onResize={() => setAlignPosition()}>
          <table cellpadding={0} cellspacing={0} style={contentStyle.value}>
            <ColGroup
              dataColumns={dataColumns.value}
              operations={operations.value}
              columnWidth={columnWidth}
            />
            {props.showHeader && renderHeader()}
            {renderBody()}
            {summaryData.value && summaryData.value.length && renderFooter()}
          </table>
        </ResizeObserver>
      );
    };

    const renderTable = (content?: Slot) => {
      const style = props.scroll?.maxHeight
        ? { maxHeight: props.scroll.maxHeight }
        : undefined;
      return (
        <>
          <div
            ref={containerRef}
            class={[`${prefixCls}-container`, tableCls.value]}
            style={style}
            onScroll={handleScroll}
          >
            <div class={`${prefixCls}-content`}>
              {content ? (
                <table cellpadding={0} cellspacing={0}>
                  {content()}
                </table>
              ) : (
                renderContent()
              )}
            </div>
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

      return (
        <div class={cls.value} style={style.value}>
          {slots.columns?.()}
          <Spin {...spinProps.value}>
            {props.pagination !== false &&
              flattenData.value.length > 0 &&
              isPaginationTop.value &&
              renderPagination()}
            {renderTable()}
            {props.pagination !== false &&
              flattenData.value.length > 0 &&
              !isPaginationTop.value &&
              renderPagination()}
          </Spin>
        </div>
      );
    };

    return {
      render,
      handleSelectAll,
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
    selectAll(checked: boolean) {
      return this.handleSelectAll(checked);
    },
  },
  render() {
    return this.render();
  },
});
