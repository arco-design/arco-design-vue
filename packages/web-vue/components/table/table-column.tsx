import { defineComponent, PropType } from 'vue';
import { TableColumn, TableFilterable, TableSortable } from './interface';

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
      type: String as PropType<TableColumn['align']>,
    },
    /**
     * @zh 固定位置
     * @en Fixed position
     */
    fixed: {
      type: String as PropType<TableColumn['fixed']>,
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
  },
  /**
   * @zh 单元格
   * @en Cell
   * @slot cell
   * @binding {TableData} record
   * @binding {TableColumn} column
   * @binding {number} rowIndex
   */
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  setup() {
    return () => null;
  },
});
