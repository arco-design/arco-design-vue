import type { CSSProperties, PropType } from 'vue';
import { defineComponent, h, TransitionGroup } from 'vue';

import usePopupManager from '../_hooks/use-popup-manager';
import { toKebabCase } from '../_utils/convert-case';
import { getPrefixCls } from '../_utils/global-config';
import { getSlotFunction } from '../_utils/vue-utils';
import { NOTIFICATION_POSITION, NotificationItem, NotificationPosition } from './interface';
import Notification from './notification.vue';

export default defineComponent({
  name: 'NotificationList',
  props: {
    notifications: {
      type: Array as PropType<NotificationItem[]>,
      default: () => [],
    },
    position: {
      type: String as PropType<NotificationPosition>,
      default: 'topRight',
      validator: (value: any) => {
        return NOTIFICATION_POSITION.includes(value);
      },
    },
  },
  emits: ['close', 'afterClose'],
  setup(props, context) {
    const prefixCls = getPrefixCls('notification-list');
    const kebabPosition = toKebabCase(props.position);
    const { zIndex } = usePopupManager('message', { runOnMounted: true });

    const isRight = props.position.includes('Right');

    return () =>
      h(
        TransitionGroup,
        {
          class: [prefixCls, `${prefixCls}-${kebabPosition}`],
          style: { zIndex: zIndex.value } as CSSProperties,
          name: `slide-${isRight ? 'right' : 'left'}-notification`,
          onAfterLeave: () => context.emit('afterClose'),
          tag: 'ul',
        },
        () =>
          props.notifications.map((item) => {
            const slots = {
              default: getSlotFunction(item.title),
              content: getSlotFunction(item.content),
              icon: getSlotFunction(item.icon),
              footer: getSlotFunction(item.footer),
              closeIcon: getSlotFunction(item.closeIcon),
              closeIconElement: getSlotFunction(item.closeIconElement),
            };
            return h(
              Notification,
              {
                key: item.id,
                type: item.type,
                style: item.style,
                class: item.class,
                duration: item.duration,
                closable: item.closable,
                showIcon: item.showIcon,
                resetOnUpdate: item.resetOnUpdate,
                onClose: () => context.emit('close', item.id),
              },
              slots,
            );
          }),
      );
  },
});
