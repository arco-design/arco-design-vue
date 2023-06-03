import { computed, CSSProperties, PropType, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { Direction } from '../_utils/constant';
import { isNumber, isUndefined } from '../_utils/is';

export default defineComponent({
  name: 'Divider',
  props: {
    /**
     * @zh 分割线的方向，是水平还是竖直
     * @en The direction of the dividing line. Can be horizontal or vertical
     * @values 'horizontal','vertical'
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 分割线文字的位置
     * @en The position of the dividing line text
     */
    orientation: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'center',
    },
    /**
     * @zh 分割线样式类型
     * @en Dividing line style type
     * @version 2.35.0
     */
    type: {
      type: String as PropType<'solid' | 'dashed' | 'dotted' | 'double'>,
    },
    /**
     * @zh 分割线宽度/高度
     * @en The wide/height of the dividing line
     * @version 2.35.0
     */
    size: {
      type: Number,
    },
    /**
     * @zh 分割线上下 margin (垂直方向时为左右 margin)
     * @en Margin up and down the split line (left and right margin in vertical direction)
     * @version 2.35.0
     */
    margin: {
      type: [Number, String] as PropType<number | string>,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('divider');
    const isHorizontal = computed(() => props.direction === 'horizontal');

    const mergedStyles = computed(() => {
      const styles: CSSProperties = {};
      if (props.size) {
        styles[
          isHorizontal.value ? 'border-bottom-width' : 'border-left-width'
        ] = isNumber(props.size) ? `${props.size}px` : props.size;
      }
      if (props.type) {
        styles[
          isHorizontal.value ? 'border-bottom-style' : 'border-left-style'
        ] = props.type;
      }
      if (!isUndefined(props.margin)) {
        const margin = isNumber(props.margin)
          ? `${props.margin}px`
          : props.margin;
        styles.margin = isHorizontal.value ? `${margin} 0` : `0 ${margin}`;
      }

      return styles;
    });

    return () => {
      const children = slots.default?.();
      const classNames = [
        prefixCls,
        `${prefixCls}-${props.direction}`,
        {
          [`${prefixCls}-with-text`]: children,
        },
      ];

      return (
        <div role="separator" class={classNames} style={mergedStyles.value}>
          {children && props.direction === 'horizontal' && (
            <span
              class={[
                `${prefixCls}-text`,
                `${prefixCls}-text-${props.orientation}`,
              ]}
            >
              {children}
            </span>
          )}
        </div>
      );
    };
  },
});
