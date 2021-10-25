import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'Divider',
  props: {
    /**
     * @zh 分割线的方向，是水平还是竖直
     * @en The direction of the dividing line. Can be horizontal or vertical
     * @values 'horizontal', 'vertical'
     */
    direction: {
      type: String,
      validator: (value: string) => ['horizontal', 'vertical'].includes(value),
      default: 'horizontal',
    },
    /**
     * @zh 分割线文字的位置
     * @en The position of the dividing line text
     * @values 'left', 'right', 'center'
     */
    orientation: {
      type: String,
      validator: (value: string) => ['left', 'right', 'center'].includes(value),
      default: 'center',
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('divider');
    return () => {
      const { direction, orientation } = props;
      const children = slots.default?.();
      const classNames = [
        prefixCls,
        `${prefixCls}-${direction}`,
        {
          [`${prefixCls}-with-text`]: children,
        },
      ];

      return (
        <div class={classNames}>
          {children && direction === 'horizontal' ? (
            <span class={`${prefixCls}-text ${prefixCls}-text-${orientation}`}>
              {children}
            </span>
          ) : null}
        </div>
      );
    };
  },
});
