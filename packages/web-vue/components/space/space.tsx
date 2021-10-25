import { Comment, CSSProperties, defineComponent, PropType, VNode } from 'vue';
import { isArray, isNumber } from '../_utils/is';
import { unFragment } from '../_utils/vue-utils';
import { getPrefixCls } from '../_utils/global-config';

type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';

export default defineComponent({
  name: 'Space',
  props: {
    /**
     * @zh 对齐方式
     * @en Alignment
     * @values 'start', 'end', 'center', 'baseline'
     */
    align: {
      type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
    },
    /**
     * @zh 间距方向
     * @en Spacing direction
     */
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal',
    },
    /**
     * @zh 间距大小，支持分别制定横向和竖向的间距
     * @en Spacing size, support for setting horizontal and vertical spacing separately
     */
    size: {
      type: [Number, String] as PropType<
        number | 'mini' | 'small' | 'medium' | 'large' | [SpaceSize, SpaceSize]
      >,
      default: 'small',
    },
    /**
     * @zh 环绕类型的间距，用于折行的场景。
     * @en The spacing of the wrapping type, used in the scene of wrapping.
     */
    wrap: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('space');

    return () => {
      const { size, direction, align, wrap } = props;
      const innerAlign = align || (direction === 'horizontal' ? 'center' : '');
      const classNames = [
        prefixCls,
        {
          [`${prefixCls}-${direction}`]: direction,
          [`${prefixCls}-align-${innerAlign}`]: innerAlign,
          [`${prefixCls}-wrap`]: wrap,
        },
      ];

      function getMargin(size: SpaceSize) {
        if (isNumber(size)) {
          return size;
        }
        switch (size) {
          case 'mini':
            return 4;
          case 'small':
            return 8;
          case 'medium':
            return 16;
          case 'large':
            return 24;
          default:
            return 8;
        }
      }

      const childrenList = unFragment(slots.default?.() || []).filter(
        (child) => (child as VNode)?.type !== Comment
      );

      const getMarginStyle = (index: number) => {
        const isLastOne = childrenList.length === index + 1;

        const marginRight = `${getMargin(isArray(size) ? size[0] : size)}px`;
        const marginBottom = `${getMargin(isArray(size) ? size[1] : size)}px`;

        if (isLastOne) {
          return [wrap ? { marginBottom } : {}];
        }

        const style: CSSProperties[] = [];
        if (direction === 'horizontal' || wrap) style.push({ marginRight });
        if (direction === 'vertical' || wrap) style.push({ marginBottom });

        return style;
      };

      return (
        <div class={classNames}>
          {childrenList.map((child, index) => {
            return (
              <div
                class={`${prefixCls}-item`}
                key={index}
                style={getMarginStyle(index)}
              >
                {child}
              </div>
            );
          })}
        </div>
      );
    };
  },
});
