import { computed, toRefs, defineComponent, DefineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { BaseGridProps } from './interface';

/**
 * @displayName Grid
 * @version 2.15.0
 */
export default defineComponent({
  name: 'BaseGrid',
  props: {
    /**
     * @zh 每一行展示的列数
     * @en Number of columns displayed in each row
     */
    cols: {
      type: Number,
      default: 24,
    },
    /**
     * @zh 行与行之间的间距
     * @en The space in row-to-row
     */
    rowGap: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 列与列之间的间距
     * @en The space in column-to-column
     */
    colGap: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否折叠
     * @en Whether to collapsed
     */
    collapsed: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 折叠时显示的行数
     * @en Number of rows displayed when collapsed
     */
    collapsedRows: {
      type: Number,
      default: 1,
    },
  },
  setup(props: BaseGridProps, { slots }) {
    const { cols, colGap, rowGap } = toRefs(props);
    const prefixCls = getPrefixCls('grid');
    const classNames = computed(() => [prefixCls]);
    const style = computed(() => [
      {
        'gap': `${rowGap.value}px ${colGap.value}px`,
        'grid-template-columns': `repeat(${cols.value}, minmax(0px, 1fr))`,
      },
    ]);

    return () => {
      return (
        <div class={classNames.value} style={style.value}>
          {slots.default?.()}
        </div>
      );
    };
  },
}) as DefineComponent<BaseGridProps>;
