import type { PropType } from 'vue';
import { defineComponent, TransitionGroup } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { toKebabCase } from '../_utils/convert-case';
import Notification from './notification.vue';
import { isFunction } from '../_utils/is';
import {
  NOTIFICATION_POSITION,
  NotificationItem,
  NotificationPosition,
} from './interface';
import usePopupManager from '../_hooks/use-popup-manager';

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
    const { zIndex } = usePopupManager({ runOnMounted: true });

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
            default: () => (isFunction(item.title) ? item.title() : item.title),
            content: () =>
              isFunction(item.content) ? item.content() : item.content,
            icon: () => (isFunction(item.icon) ? item.icon() : item.icon),
          };
          return (
            <Notification
              key={item.id}
              type={item.type}
              duration={item.duration}
              closable={item.closable}
              v-slots={slots}
              onClose={() => context.emit('close', item.id)}
            />
          );
        })}
      </TransitionGroup>
    );
  },
});
