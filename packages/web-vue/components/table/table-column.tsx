import {
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { TableColumnData, TableFilterable, TableSortable } from './interface';
import {
  tableColumnInjectionKey,
  TableContext,
  tableInjectionKey,
} from './context';
import { isEqual } from '../_utils/is-equal';
import { useChildrenComponents } from '../_hooks/use-children-components';
import { isObject } from '../_utils/is';

export default defineComponent({
  name: 'TableColumn',
  props: {
    /**
     * @zh 列信息的标识，对应TableData中的数据
     * @en Identifies the column information, corresponding to the data in TableData
     */
    dataIndex: String,
    /**
     * @zh 列标题
     * @en Column title
     */
    title: String,
    /**
     * @zh 列宽度
     * @en Column width
     */
    width: Number,
    /**
     * @zh 对齐方向
     * @en Alignment direction
     */
    align: {
      type: String as PropType<TableColumnData['align']>,
    },
    /**
     * @zh 固定位置
     * @en Fixed position
     */
    fixed: {
      type: String as PropType<TableColumnData['fixed']>,
    },
    /**
     * @zh 是否显示为省略
     * @en Whether to display as omitted
     */
    ellipsis: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 排序相关选项
     * @en Sorting related options
     */
    sortable: {
      type: Object as PropType<TableSortable>,
      default: undefined,
    },
    /**
     * @zh 过滤相关选项
     * @en Filter related options
     */
    filterable: {
      type: Object as PropType<TableFilterable>,
      default: undefined,
    },
    /**
     * @zh 自定义单元格样式
     * @en Custom cell style
     * @version 2.11.0
     */
    cellStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 用于手动指定选项的 index。2.26.0 版本后不再需要手动指定
     * @en index for manually specifying option. Manual specification is no longer required after version 2.26.0
     * @version 2.20.2
     */
    index: {
      type: Number,
    },
    /**
     * @zh 在省略时是否显示文字提示
     * @en Whether to show text hints when omitted
     * @version 2.26.0
     */
    tooltip: {
      type: [Boolean, Object],
      default: false,
    },
  },
  /**
   * @zh 单元格
   * @en Cell
   * @slot cell
   * @binding {TableData} record
   * @binding {TableColumnData} column
   * @binding {number} rowIndex
   */
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  /**
   * @zh 自定义筛选弹出框内容
   * @en Title
   * @slot filter-content
   * @binding {string[]} filterValue
   * @binding {(filterValue: string[]) => void} setFilterValue
   * @binding {(event: Event) => void} handleFilterConfirm
   * @binding {(event: Event) => void} handleFilterReset
   * @version 2.23.0
   */
  /**
   * @zh 筛选按钮图标
   * @en Title
   * @slot filter-icon
   * @version 2.23.0
   */
  setup(props, { slots }) {
    const {
      dataIndex,
      title,
      width,
      align,
      fixed,
      ellipsis,
      sortable: _sortable,
      filterable: _filterable,
      cellStyle: _cellStyle,
      tooltip: _tooltip,
      index,
    } = toRefs(props);
    const sortable = ref(_sortable.value);
    watch(_sortable, (cur, pre) => {
      if (!isEqual(cur, pre)) {
        sortable.value = cur;
      }
    });
    const filterable = ref(_filterable.value);
    watch(_filterable, (cur, pre) => {
      if (!isEqual(cur, pre)) {
        // @ts-ignore
        filterable.value = cur;
      }
    });
    const cellStyle = ref(_cellStyle.value);
    watch(_cellStyle, (cur, pre) => {
      if (!isEqual(cur, pre)) {
        cellStyle.value = cur;
      }
    });
    const tooltip = ref(_tooltip.value);
    watch(_tooltip, (cur, pre) => {
      if (isObject(cur) && isObject(pre)) {
        if (!isEqual(cur, pre)) {
          tooltip.value = cur;
        }
      } else {
        tooltip.value = cur;
      }
    });

    const instance = getCurrentInstance();
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});
    const tableColumnCtx = inject(tableColumnInjectionKey, undefined);
    const { children, components } = useChildrenComponents('TableColumn');

    const childrenColumnMap = reactive(new Map<number, TableColumnData>());

    const addChild = (id: number, data: any) => {
      childrenColumnMap.set(id, data);
    };

    const removeChild = (id: number) => {
      childrenColumnMap.delete(id);
    };

    provide(tableColumnInjectionKey, {
      addChild,
      removeChild,
    });

    const childrenColumns = ref<TableColumnData[]>();
    watch(
      [components, childrenColumnMap],
      ([components, childrenColumnMap]) => {
        if (components.length > 0) {
          const columns: TableColumnData[] = [];
          components.forEach((id) => {
            const column = childrenColumnMap.get(id);
            if (column) columns.push(column);
          });
          childrenColumns.value = columns;
        } else {
          childrenColumns.value = undefined;
        }
      }
    );

    const column = reactive({
      dataIndex,
      title,
      width,
      align,
      fixed,
      ellipsis,
      sortable,
      filterable,
      cellStyle,
      index,
      tooltip,
      children: childrenColumns,
      slots,
    });

    if (instance) {
      if (tableColumnCtx) {
        // @ts-ignore
        tableColumnCtx.addChild(instance.uid, column);
      } else {
        tableCtx.addColumn?.(instance.uid, column);
      }
    }

    onBeforeUnmount(() => {
      if (instance) {
        if (tableColumnCtx) {
          tableColumnCtx.removeChild(instance.uid);
        } else {
          tableCtx.removeColumn?.(instance.uid);
        }
      }
    });

    return () => {
      children.value = slots.default?.();
      return children.value;
    };
  },
});
