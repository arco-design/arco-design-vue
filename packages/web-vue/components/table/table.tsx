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
  isNumber,
  isObject,
  isString,
} from '../_utils/is';
import type {
  Filters,
  Sorter,
  TableColumn,
  TableExpandable,
  TableOperationColumn,
  TableRowSelection,
  TableBorder,
  TableComponents,
  TableData,
  TablePagePosition,
} from './interface';
import { getColumnsFromSlot, getGroupColumns } from './utils';
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
import Tbody from './table-tbody.vue';
import Tr from './table-tr.vue';
import Th from './table-th';
import Td from './table-td';
import OperationTh from './table-operation-th';
import OperationTd from './table-operation-td';
import VirtualList from '../_components/virtual-list/virtual-list.vue';
import ResizeObserver from '../_components/resize-observer';
import { VirtualListProps } from '../_components/virtual-list/interface';
import usePickSlots from '../_hooks/use-pick-slots';
import { omit } from '../_utils/omit';
import { getChildrenComponents } from '../_utils/vue-utils';
import { EmitType } from '../_utils/types';
import { configProviderInjectionKey } from '../config-provider/context';

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
      type: Array as PropType<TableColumn[]>,
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
     * @zh 表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。
     * @en Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values.
     */
    scroll: {
      type: Object as PropType<{ x?: number | string; y?: number | string }>,
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
          column: TableColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
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
      type: [Function, Array] as PropType<(rowKeys: string[]) => void>,
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
        (record: TableData, column: TableColumn) => void
      >,
    },
    onRowClick: {
      type: [Function, Array] as PropType<(record: TableData) => void>,
    },
    onHeaderClick: {
      type: [Function, Array] as PropType<(column: TableColumn) => void>,
    },
  },
  emits: [
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
     * @param {any} extra
     */
    'change',
    /**
     * @zh 点击单元格时触发
     * @en Triggered when a cell is clicked
     * @param {TableData} record
     * @param {TableColumn} column
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
     * @param {TableColumn} column
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
  setup(props, { emit, slots }) {
    const { rowKey } = toRefs(props);
    const prefixCls = getPrefixCls('table');
    const bordered = computed(() => {
      if (isObject(props.bordered)) {
        return { ...DEFAULT_BORDERED, ...props.bordered };
      }
      return { ...DEFAULT_BORDERED, wrapper: props.bordered };
    });

    // whether to scroll
    const isScroll = computed(() => {
      const x = Boolean(props.scroll?.x);
      const y = Boolean(props.scroll?.y);
      return { x, y };
    });

    const theadRef = ref<HTMLElement>();
    const tbodyRef = ref<HTMLElement>();

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

    const columnsSlot = usePickSlots(slots, 'columns');

    const slotColumns = computed(() => {
      if (columnsSlot.value) {
        return getColumnsFromSlot(
          getChildrenComponents(columnsSlot.value(), 'TableColumn')
        );
      }
      return undefined;
    });

    // 拆解分组后的数据表头信息
    const dataColumns = ref<TableColumn[]>([]);
    const groupColumns = ref<TableColumn[][]>([]);

    watch(
      () => [props.columns, slotColumns.value],
      ([columns, slotColumns]) => {
        const result = getGroupColumns(slotColumns ?? columns ?? []);
        // @ts-ignore
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
      if (props.rowSelection?.fixed || props.expandable?.fixed) {
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

    // 外部筛选项，优先使用
    const outerFilters = computed(() => {
      const filters: Filters = {};
      for (const item of dataColumns.value) {
        if (item.dataIndex && item.filterable?.filteredValue) {
          filters[item.dataIndex] = item.filterable.filteredValue;
        }
      }
      return filters;
    });

    const getDefaultFilters = () => {
      const filters: Filters = {};
      for (const item of dataColumns.value) {
        if (item.dataIndex && item.filterable?.defaultFilteredValue) {
          filters[item.dataIndex] = item.filterable.defaultFilteredValue;
        }
      }
      return filters;
    };

    const getDefaultSorter = (): Sorter => {
      for (const item of dataColumns.value) {
        // get first enabled sorter
        if (item.dataIndex && item.sortable?.defaultSortOrder) {
          return {
            filed: item.dataIndex,
            direction: item.sortable.defaultSortOrder,
          };
        }
      }
      return {};
    };

    const _filters = ref(getDefaultFilters());
    const _sorter = ref(getDefaultSorter());

    const computedFilters = computed<Filters>(() => ({
      ..._filters.value,
      ...outerFilters.value,
    }));

    const computedSorter = computed<Sorter>(() => {
      for (const item of dataColumns.value) {
        if (item.dataIndex && item.sortable) {
          // Take the first existing collation
          const direction = isString(item.sortable.sortOrder)
            ? item.sortable.sortOrder
            : _sorter.value.filed === item.dataIndex
            ? _sorter.value.direction
            : '';
          if (direction) {
            return {
              filed: item.dataIndex,
              direction,
            };
          }
        }
      }
      return {} as Sorter;
    });

    const handleFilterChange = (
      dataIndex: string,
      filteredValues: string[]
    ) => {
      const newFilters = {
        ...computedFilters.value,
        [dataIndex]: filteredValues,
      };
      _filters.value = newFilters;

      emit('filterChange', dataIndex, filteredValues);
      handleChange('filter');
    };

    const handleSorterChange = (
      dataIndex: string,
      direction: 'ascend' | 'descend' | ''
    ) => {
      const newSorter: Sorter = direction
        ? {
            filed: dataIndex,
            direction,
          }
        : {};

      _sorter.value = newSorter;

      emit('sorterChange', dataIndex, direction);
      handleChange('sorter');
    };

    const getColumnByDataIndex = (dataIndex: string) => {
      for (const item of dataColumns.value) {
        if (item.dataIndex === dataIndex) {
          return item;
        }
      }
      return undefined;
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
      const travel = (data: TableData[]) => {
        for (const record of data) {
          keys.push(record[rowKey.value]);
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

      const travel = (data: TableData[]) => {
        for (const record of data) {
          if (!record.disabled) {
            keys.push(record[rowKey.value]);
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
    } = useRowSelection(
      props,
      {
        allRowKeys,
        currentAllRowKeys,
        currentAllEnabledRowKeys,
      },
      emit
    );

    const { expandedRowKeys, handleExpand } = useExpand(
      props,
      allRowKeys.value,
      emit
    );

    const lazyLoadData = reactive<Record<string, TableData[]>>({});

    const addLazyLoadData = (
      children: TableData[] | undefined,
      record: TableData
    ) => {
      if (children) {
        lazyLoadData[record[props.rowKey]] = children;
      }
    };

    const isValidRecord = (record: TableData) => {
      for (const field of Object.keys(computedFilters.value)) {
        const filteredValues = computedFilters.value[field];
        const column = getColumnByDataIndex(field);
        if (column && column.filterable?.filter && filteredValues.length > 0) {
          const result = column.filterable?.filter(filteredValues, record);
          if (!result) {
            return result;
          }
        }
      }
      return true;
    };

    const processData = (origin: TableData[]) => {
      const travel = (data: TableData[]) => {
        const result: TableData[] = [];

        for (const record of data) {
          if (isValidRecord(record)) {
            // add lazy load children
            if (
              props.loadMore &&
              !record.isLeaf &&
              !record.children &&
              lazyLoadData[record[props.rowKey]]
            ) {
              record.children = lazyLoadData[record[props.rowKey]];
            }

            if (record.children) {
              record.children = travel(record.children);
            }
            result.push(record);
          }
        }
        return result;
      };

      const data = travel(isArray(origin) ? origin : []);

      if (data.length > 0) {
        if (computedSorter.value.filed) {
          const column = getColumnByDataIndex(computedSorter.value.filed);
          if (column && column.sortable?.sorter !== true) {
            data.sort((a, b) => {
              const valueA = a[computedSorter.value.filed];
              const valueB = b[computedSorter.value.filed];
              const result = (
                isFunction(column.sortable?.sorter)
                  ? column.sortable?.sorter?.(valueA, valueB)
                  : valueA > valueB
              )
                ? 1
                : -1;
              return computedSorter.value.direction === 'descend'
                ? -result
                : result;
            });
          }
        }
      }

      return data;
    };

    // 数据处理（筛选和排序）
    const processedData = computed(() => processData(props.data));

    const { page, pageSize, handlePageChange, handlePageSizeChange } =
      usePagination(props, emit);

    const handleChange = (type: 'pagination' | 'sorter' | 'filter') => {
      const extra = {
        type,
        page: page.value,
        pageSize: pageSize.value,
        sorter: computedSorter.value,
        filters: computedFilters.value,
      };
      emit('change', flattenData.value, extra);
    };

    const flattenData = computed(() => {
      if (props.pagination && processedData.value.length > pageSize.value) {
        return processedData.value.slice(
          (page.value - 1) * pageSize.value,
          page.value * pageSize.value
        );
      }
      return processedData.value;
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
      if (isScroll.value.y && theadRef.value) {
        theadRef.value.scrollLeft = target.scrollLeft;
      }
      setAlignPosition();
    };

    const handleRowClick = (record: TableData) => {
      emit('rowClick', record);
    };

    const handleCellClick = (record: TableData, column: TableColumn) => {
      emit('cellClick', record, column);
    };

    const handleHeaderClick = (column: TableColumn) => {
      emit('headerClick', column);
    };

    const getOperations = () => {
      const operations: TableOperationColumn[] = [];
      const hasFixedColumn =
        hasLeftFixedColumn.value || hasRightFixedColumn.value;
      let expand: TableOperationColumn | undefined;
      let selection: TableOperationColumn | undefined;

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
          name: 'selection',
          title: props.rowSelection.title,
          width: props.rowSelection.width,
          fixed: props.rowSelection.fixed || hasFixedColumn,
        };
        operations.push(selection);
      }

      const operationsFn = props.components?.operations;

      return isFunction(operationsFn)
        ? operationsFn({ expand, selection })
        : operations;
    };

    const operations = computed(() => getOperations());

    const contentStyle = computed(() => {
      if (isScroll.value.x && flattenData.value.length > 0) {
        return {
          width: isNumber(props.scroll?.x)
            ? `${props.scroll?.x}px`
            : props.scroll?.x,
        };
      }
      return undefined;
    });

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
        [`${prefixCls}-type-selection`]: props.rowSelection,
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

    const thRefs = ref<{
      operation: HTMLElement[];
      data: Record<string, HTMLElement>;
    }>({
      operation: [],
      data: {},
    });

    const isVirtualList = computed(() => Boolean(props.virtualListProps));

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
    };

    onMounted(() => {
      hasScrollBar.value = isTbodyHasScrollBar();
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

    const renderExpandContent = (record: TableData) => {
      if (isFunction(record.expand)) {
        return record.expand();
      }
      if (record.expand) {
        return record.expand;
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
      flattenData.value.forEach((record, rowIndex) => {
        dataColumns.value.forEach((column, columnIndex) => {
          const { rowspan = 1, colspan = 1 } =
            props.spanMethod?.({
              record,
              column,
              rowIndex,
              columnIndex,
            }) ?? {};
          if (rowspan > 1 || colspan > 1) {
            data[`${rowIndex}-${columnIndex}`] = [rowspan, colspan];
          }
        });
      });

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

    const virtualListRef = ref();

    const renderVirtualListBody = () => {
      return (
        <VirtualList
          ref={virtualListRef}
          class={`${prefixCls}-body`}
          {...props.virtualListProps}
          data={flattenData.value}
          v-slots={{
            item: ({ item, index }: { item: TableData; index: number }) =>
              renderRecord(item, index),
          }}
        />
      );
    };

    const renderExpandBtn = (record: TableData) => {
      const currentKey = record[rowKey.value];
      const expanded = expandedRowKeys.value.includes(currentKey);

      return (
        <button
          type="button"
          class={`${prefixCls}-expand-btn`}
          onClick={(ev: Event) => {
            handleExpand(currentKey);
            ev.stopPropagation();
          }}
        >
          {slots['expand-icon']?.({ expanded, record }) ??
            props.expandable?.icon?.(expanded, record) ??
            (expanded ? <IconMinus /> : <IconPlus />)}
        </button>
      );
    };

    const renderRecord = (
      record: TableData,
      rowIndex: number,
      { indentSize = 0 }: { indentSize?: number } = {}
    ): JSX.Element => {
      const currentKey = record[rowKey.value];
      const expandContent = renderExpandContent(record);
      const showExpand = expandedRowKeys.value.includes(currentKey);
      const hasSubTree = Boolean(
        record.children
          ? props.hideExpandButtonOnEmpty
            ? record.children.length > 0
            : true
          : props.loadMore && !record.isLeaf
      );
      const subTreeHasSubData =
        record.children?.some((record) => Boolean(record.children)) ?? false;

      const scrollContainer = isScroll.value.y
        ? tbodyRef.value
        : containerRef.value;

      return (
        <>
          <Tr
            key={currentKey}
            checked={selectedRowKeys.value?.indexOf(currentKey) > -1}
            onClick={(e: Event) => handleRowClick(record)}
          >
            {operations.value.map((operation, index) => {
              const style =
                isVirtualList.value &&
                thRefs.value.operation[index]?.offsetWidth
                  ? {
                      width: `${thRefs.value.operation[index]?.offsetWidth}px`,
                    }
                  : undefined;

              return (
                <OperationTd
                  key={`operation-td-${index}`}
                  style={style}
                  record={record}
                  rowKey={rowKey.value}
                  isRadio={isRadio.value}
                  hasExpand={Boolean(expandContent)}
                  operationColumn={operation}
                  operations={operations.value}
                  selectedRowKeys={selectedRowKeys.value}
                  expandedIcon={props.expandable?.icon}
                  expandedRowKeys={expandedRowKeys.value}
                  renderExpandBtn={renderExpandBtn}
                  onSelect={handleSelect}
                  onExpand={handleExpand}
                />
              );
            })}
            {dataColumns.value.map((column, index) => {
              const extraProps =
                index === 0
                  ? {
                      showExpandBtn: hasSubTree,
                      indentSize: hasSubTree ? indentSize - 20 : indentSize,
                    }
                  : {};

              const style =
                isVirtualList.value &&
                thRefs.value.data[column.dataIndex]?.offsetWidth
                  ? {
                      width: `${
                        thRefs.value.data[column.dataIndex]?.offsetWidth
                      }px`,
                    }
                  : undefined;

              const cellId = `${rowIndex}-${index}`;
              const [rowspan, colspan] = tableSpan.value[
                `${rowIndex}-${index}`
              ] ?? [1, 1];

              if (removedCells.value.includes(cellId)) {
                return null;
              }

              return (
                <Td
                  key={`td-${index}`}
                  style={style}
                  rowIndex={rowIndex}
                  record={record}
                  isSorted={
                    Boolean(computedSorter.value.filed) &&
                    column.dataIndex === computedSorter.value.filed
                  }
                  column={column}
                  operations={operations.value}
                  dataColumns={dataColumns.value}
                  loadMore={props.loadMore}
                  addLazyLoadData={addLazyLoadData}
                  rowSpan={rowspan}
                  renderExpandBtn={renderExpandBtn}
                  colSpan={colspan}
                  {...extraProps}
                  onClick={(e: Event) => handleCellClick(record, column)}
                />
              );
            })}
          </Tr>
          {showExpand &&
            (hasSubTree ? (
              record.children?.map((item, index) =>
                renderRecord(item, index, {
                  indentSize: subTreeHasSubData
                    ? indentSize + props.indentSize + 20
                    : indentSize + props.indentSize,
                })
              )
            ) : (
              <Tr isExpandRow key={`${currentKey}-expand`}>
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
            ))}
        </>
      );
    };

    const renderBody = () => {
      const hasSubData = flattenData.value.some((record) =>
        Boolean(record.children)
      );

      return (
        <Tbody>
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
                  ref={(ins: ComponentPublicInstance): void => {
                    if (ins?.$el) {
                      thRefs.value.operation[index] = ins.$el;
                    }
                  }}
                  key={`operation-th-${index}`}
                  operationColumn={operation}
                  operations={operations.value}
                  rowSelection={props.rowSelection}
                  rowSpan={groupColumns.value.length}
                  expandable={props.expandable}
                  selectedNumber={currentSelectedRowKeys.value.length}
                  totalNumber={currentAllRowKeys.value.length}
                  totalEnabledNumber={currentAllEnabledRowKeys.value.length}
                  onSelectAll={handleSelectAll}
                />
              ))}
            {row.map((column, index) => {
              const sortOrder =
                column.dataIndex === computedSorter.value.filed
                  ? computedSorter.value.direction
                  : '';

              return (
                <Th
                  key={`th-${index}`}
                  // @ts-ignore
                  ref={(ins: ComponentPublicInstance) => {
                    if (ins?.$el) {
                      thRefs.value.data[column.dataIndex] = ins.$el;
                    }
                  }}
                  column={column}
                  operations={operations.value}
                  dataColumns={dataColumns.value}
                  sortOrder={sortOrder}
                  filterIconAlignLeft={props.filterIconAlignLeft}
                  filterValue={computedFilters.value[column.dataIndex] ?? []}
                  onSorterChange={handleSorterChange}
                  onFilterChange={handleFilterChange}
                  onClick={(e: Event) => handleHeaderClick(column)}
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
                  style={contentStyle.value}
                >
                  <ColGroup
                    dataColumns={dataColumns.value}
                    operations={operations.value}
                  />
                  {renderHeader()}
                </table>
              </div>
            )}
            <ResizeObserver onResize={handleTbodyResize}>
              {isVirtualList.value ? (
                renderVirtualListBody()
              ) : (
                <div
                  ref={tbodyRef}
                  class={`${prefixCls}-body`}
                  style={{
                    maxHeight: isNumber(props.scroll?.y)
                      ? `${props.scroll?.y}px`
                      : props.scroll?.y,
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
                      />
                    )}
                    {renderBody()}
                  </table>
                </div>
              )}
            </ResizeObserver>
          </>
        );
      }

      return (
        <ResizeObserver onResize={() => setAlignPosition()}>
          <table cellpadding={0} cellspacing={0} style={contentStyle.value}>
            <ColGroup
              dataColumns={dataColumns.value}
              operations={operations.value}
            />
            {props.showHeader && renderHeader()}
            {renderBody()}
          </table>
        </ResizeObserver>
      );
    };

    const renderTable = (content?: Slot) => (
      <>
        <div
          ref={containerRef}
          class={[`${prefixCls}-container`, tableCls.value]}
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
          <Pagination
            total={processedData.value.length}
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
        </div>
      );
    };

    return () => {
      if (slots.default) {
        return <div class={cls.value}>{renderTable(slots.default)}</div>;
      }

      return (
        <div class={cls.value}>
          <Spin {...spinProps.value}>
            {props.pagination !== false &&
              isPaginationTop.value &&
              renderPagination()}
            {renderTable()}
            {props.pagination !== false &&
              !isPaginationTop.value &&
              renderPagination()}
          </Spin>
        </div>
      );
    };
  },
});
