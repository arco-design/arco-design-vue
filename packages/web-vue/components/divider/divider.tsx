import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { Direction } from '../_utils/constant';

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
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('divider');
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
        <div role="separator" class={classNames}>
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
