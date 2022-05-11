import { defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { Direction } from '../_utils/constant';

export default defineComponent({
  name: 'ListItem',
  props: {
    /**
     * @zh 操作组排列方向
     * @en Operation group arrangement direction
     */
    actionLayout: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
  },
  /**
   * @zh 操作组
   * @en Actions
   * @slot actions
   */
  /**
   * @zh 额外内容
   * @en Extra content
   * @slot extra
   */
  /**
   * @zh meta信息
   * @en Meta data
   * @slot meta
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('list-item');

    const renderAction = () => {
      const actions = slots.actions?.();
      if (!actions || !actions.length) {
        return null;
      }

      return (
        <ul class={`${prefixCls}-action`}>
          {actions.map((item, index) => (
            <li key={`${prefixCls}-action-${index}`}>{item}</li>
          ))}
        </ul>
      );
    };

    return () => (
      <div role="listitem" class={prefixCls}>
        <div class={`${prefixCls}-main`}>
          {slots.meta?.()}
          <div class={`${prefixCls}-content`}>{slots.default?.()}</div>
          {props.actionLayout === 'vertical' && renderAction()}
        </div>
        {props.actionLayout === 'horizontal' && renderAction()}
        {slots.extra && <div class={`${prefixCls}-extra`}>{slots.extra()}</div>}
      </div>
    );
  },
});
