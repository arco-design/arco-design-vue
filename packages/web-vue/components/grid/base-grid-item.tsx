import { computed, defineComponent, DefineComponent, toRefs } from 'vue';
import { BaseGridItemProps } from './interface';
import { getPrefixCls } from '../_utils/global-config';

/**
 * @displayName GridItem
 * @version 2.15.0
 */
export default defineComponent({
  name: 'BaseGridItem',
  props: {
    /**
     * @zh 跨越的格数
     * @en Number of grids spanned
     */
    span: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 左侧的间隔格数
     * @en Number of grids on the left
     */
    offset: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否是后缀元素
     * @en Is it a suffix element
     */
    suffix: {
      type: Boolean,
      default: false,
    },
    overflow: {
      type: Boolean,
      default: false,
    },
    colGap: {
      type: Number,
      default: 0,
    },
    cols: {
      type: Number,
      default: 24,
    },
  },
  setup(props: BaseGridItemProps, { slots }) {
    const { span, offset, suffix, overflow, colGap, cols } = toRefs(props);
    const prefixCls = getPrefixCls('grid-item');
    const classNames = computed(() => [prefixCls]);
    const offsetStyle = computed(() => {
      if (offset.value > 0) {
        const oneSpan = `(100% - ${colGap.value * (span.value - 1)}px) / ${
          span.value
        }`;
        return {
          'margin-left': `calc((${oneSpan} * ${offset.value}) + ${
            colGap.value * offset.value
          }px)`,
        };
      }
      return {};
    });
    const columnStart = computed(() => {
      if (suffix.value) {
        return `${cols.value - span.value + 1}`;
      }
      return `span ${span.value}`;
    });
    const style = computed(() => [
      {
        'grid-column': `${columnStart.value} / span ${span.value}`,
      },
      offsetStyle.value,
      span.value === 0 ? { display: 'none' } : {},
    ]);

    return () => {
      return (
        <div class={classNames.value} style={style.value}>
          {slots.default?.({ overflow: overflow.value })}
        </div>
      );
    };
  },
}) as DefineComponent<BaseGridItemProps>;
