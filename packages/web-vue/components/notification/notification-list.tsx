import type { PropType } from 'vue';
import { defineComponent, TransitionGroup } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { toKebabCase } from '../_utils/convert-case';
import Notification from './notification.vue';
import {
  NOTIFICATION_POSITION,
  NotificationItem,
  NotificationPosition,
} from './interface';
import usePopupManager from '../_hooks/use-popup-manager';
import { getSlotFunction } from '../_utils/vue-utils';

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

    return () => (
      <TransitionGroup
        class={[prefixCls, `${prefixCls}-${kebabPosition}`]}
        style={{ zIndex: zIndex.value }}
        name={`slide-${isRight ? 'right' : 'left'}-notification`}
        onAfterLeave={() => context.emit('afterClose')}
        tag="ul"
      >
        {props.notifications.map((item) => {
          const slots = {
            default: getSlotFunction(item.title),
            content: getSlotFunction(item.content),
            icon: getSlotFunction(item.icon),
            footer: getSlotFunction(item.footer),
            closeIcon: getSlotFunction(item.closeIcon),
            closeIconElement: getSlotFunction(item.closeIconElement),
          };
          return (
            <Notification
              key={item.id}
              type={item.type}
              style={item.style}
              class={item.class}
              duration={item.duration}
              closable={item.closable}
              showIcon={item.showIcon}
              resetOnUpdate={item.resetOnUpdate}
              v-slots={slots}
              onClose={() => context.emit('close', item.id)}
            />
          );
        })}
      </TransitionGroup>
    );
  },
});
