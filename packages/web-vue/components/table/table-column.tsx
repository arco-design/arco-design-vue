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
import { isNumber } from '../_utils/is';
import { isEqual } from '../_utils/is-equal';

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
     * @zh 用于手动指定选项的 index
     * @en index for manually specifying option
     * @version 2.20.2
     */
    index: {
      type: Number,
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

    const instance = getCurrentInstance();
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {});
    const tableColumnCtx = inject(tableColumnInjectionKey, undefined);

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

    const children = ref<TableColumnData[]>();
    watch(childrenColumnMap, (childrenColumnMap) => {
      if (childrenColumnMap.size > 0) {
        children.value = Array.from(childrenColumnMap.values()).sort((a, b) => {
          if (isNumber(a.index) && isNumber(b.index)) {
            return a.index - b.index;
          }
          return 0;
        });
      } else {
        children.value = undefined;
      }
    });

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
      children,
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

    return () => slots.default?.();
  },
});
