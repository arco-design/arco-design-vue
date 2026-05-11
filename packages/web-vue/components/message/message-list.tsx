import type { CSSProperties, PropType } from 'vue';
import { defineComponent, h, TransitionGroup } from 'vue';

import usePopupManager from '../_hooks/use-popup-manager';
import { getPrefixCls } from '../_utils/global-config';
import { getSlotFunction } from '../_utils/vue-utils';
import { MessageItem, MessagePosition } from './interface';
import Message from './message.vue';

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

    return () =>
      h(
        TransitionGroup,
        {
          class: [prefixCls, `${prefixCls}-${props.position}`],
          name: 'fade-message',
          tag: 'ul',
          style: { zIndex: zIndex.value } as CSSProperties,
          onAfterLeave: () => context.emit('afterClose'),
        },
        () =>
          props.messages.map((item) => {
            const slots = {
              default: getSlotFunction(item.content),
              icon: getSlotFunction(item.icon),
            };
            return h(
              Message,
              {
                key: item.id,
                type: item.type,
                duration: item.duration,
                closable: item.closable,
                resetOnUpdate: item.resetOnUpdate,
                resetOnHover: item.resetOnHover,
                onClose: () => context.emit('close', item.id),
              },
              slots,
            );
          }),
      );
  },
});
