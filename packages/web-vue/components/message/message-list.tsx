import type { PropType } from 'vue';
import { defineComponent, TransitionGroup } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Message from './message.vue';
import { MessageItem, MessagePosition } from './interface';
import usePopupManager from '../_hooks/use-popup-manager';
import { getSlotFunction } from '../_utils/vue-utils';

export default defineComponent({
  name: 'MessageList',
  props: {
    messages: {
      type: Array as PropType<MessageItem[]>,
      default: () => [],
    },
    position: {
      type: String as PropType<MessagePosition>,
      default: 'top',
    },
  },
  emits: ['close', 'afterClose'],
  setup(props, context) {
    const prefixCls = getPrefixCls('message-list');
    const { zIndex } = usePopupManager('message', { runOnMounted: true });

    return () => (
      <TransitionGroup
        // Vue 3.5 的 TransitionGroup 类型只声明了 $props，未合并
        // AllowedComponentProps，class/style 需要绕过类型检查（运行期合法）
        {...({
          class: [prefixCls, `${prefixCls}-${props.position}`],
          style: { zIndex: zIndex.value },
        } as any)}
        name="fade-message"
        tag="ul"
        onAfterLeave={() => context.emit('afterClose')}
      >
        {props.messages.map((item) => {
          const slots = {
            default: getSlotFunction(item.content),
            icon: getSlotFunction(item.icon),
          };
          return (
            <Message
              key={item.id}
              type={item.type}
              duration={item.duration}
              closable={item.closable}
              resetOnUpdate={item.resetOnUpdate}
              resetOnHover={item.resetOnHover}
              v-slots={slots}
              onClose={() => context.emit('close', item.id)}
            />
          );
        })}
      </TransitionGroup>
    );
  },
});
