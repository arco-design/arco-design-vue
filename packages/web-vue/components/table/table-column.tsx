import {
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  PropType,
  provide,
  reactive,
  Ref,
  ref,
  toRefs,
  watch,
} from 'vue';
import {
  TableColumnData,
  TableData,
  TableFilterable,
  TableSortable,
} from './interface';
import {
  tableColumnInjectionKey,
  TableContext,
  tableInjectionKey,
} from './context';
import { useChildrenComponents } from '../_hooks/use-children-components';
import { usePureProp } from '../_hooks/use-pure-prop';
import { ClassName } from '../_utils/types';

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
     * @zh 最小列宽
     * @en Minimum column width
     */
    minWidth: Number,
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
     * @zh 自定义单元格类名
     * @en Custom cell class
     * @version 2.36.0
     */
    cellClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 自定义表头单元格类名
     * @en Custom cell class
     * @version 2.36.0
     */
    headerCellClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 自定义内容单元格类名
     * @en Custom cell class
     * @version 2.36.0
     */
    bodyCellClass: {
      type: [String, Array, Object, Function] as PropType<
        ClassName | ((record: TableData) => ClassName)
      >,
    },
    /**
     * @zh 自定义总结栏单元格类名
     * @en Customize summary column cell class
     * @version 2.36.0
     */
    summaryCellClass: {
      type: [String, Array, Object, Function] as PropType<
        ClassName | ((record: TableData) => ClassName)
      >,
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
     * @zh 自定义表头单元格样式
     * @en Custom cell style
     * @version 2.29.0
     */
    headerCellStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 自定义内容单元格样式
     * @en Custom cell style
     * @version 2.29.0
     */
    bodyCellStyle: {
      type: [Object, Function] as PropType<
        CSSProperties | ((record: TableData) => CSSProperties)
      >,
    },
    /**
     * @zh 自定义总结栏单元格样式
     * @en Customize summary column cell style
     * @version 2.30.0
     */
    summaryCellStyle: {
      type: [Object, Function] as PropType<
        CSSProperties | ((record: TableData) => CSSProperties)
      >,
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
    const { dataIndex, title, width, align, fixed, ellipsis, index, minWidth } =
      toRefs(props);
    const sortable = usePureProp(props, 'sortable');
    const filterable = usePureProp(props, 'filterable');
    const cellClass = usePureProp(props, 'cellClass') as Ref<
      typeof props.cellClass
    >;
    const headerCellClass = usePureProp(props, 'headerCellClass') as Ref<
      typeof props.headerCellClass
    >;
    const bodyCellClass = usePureProp(props, 'bodyCellClass') as Ref<
      typeof props.bodyCellClass
    >;
    const summaryCellClass = usePureProp(props, 'summaryCellClass') as Ref<
      typeof props.summaryCellClass
    >;
    const cellStyle = usePureProp(props, 'cellStyle');
    const headerCellStyle = usePureProp(props, 'headerCellStyle');
    const bodyCellStyle = usePureProp(props, 'bodyCellStyle');
    const summaryCellStyle = usePureProp(props, 'summaryCellStyle');
    const tooltip = usePureProp(props, 'tooltip');

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
      minWidth,
      align,
      fixed,
      ellipsis,
      sortable,
      filterable,
      cellClass,
      headerCellClass,
      bodyCellClass,
      summaryCellClass,
      cellStyle,
      headerCellStyle,
      bodyCellStyle,
      summaryCellStyle,
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
