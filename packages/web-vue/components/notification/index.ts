import type { App, AppContext, Ref } from 'vue';
import { createVNode, render, reactive, ref } from 'vue';
import { MESSAGE_TYPES, MessageType } from '../_utils/constant';
import { getOverlay } from '../_utils/dom';
import { isFunction, isString, isUndefined } from '../_utils/is';
import NotificationList from './notification-list';
import {
  NotificationConfig,
  NotificationItem,
  NotificationMethod,
  NotificationPosition,
} from './interface';

type _NotificationConfig = NotificationConfig & {
  type: MessageType;
};

class NotificationManger {
  private readonly container: HTMLElement;

  private readonly notificationIds: Set<number | string>;

  private readonly notifications: Ref<NotificationItem[]>;

  private readonly position: NotificationPosition;

  private notificationCount = 0;

  constructor(config: _NotificationConfig, appContext?: AppContext) {
    const { position = 'topRight' } = config;
    this.container = getOverlay('notification');
    this.notificationIds = new Set();
    this.notifications = ref([]);
    this.position = position;

    const vm = createVNode(NotificationList, {
      notifications: this.notifications.value,
      position,
      onClose: this.remove,
      onAfterClose: this.destroy,
    });

    if (appContext) {
      vm.appContext = appContext;
    }
    render(vm, this.container);
    document.body.appendChild(this.container);
  }

  add = (config: _NotificationConfig) => {
    this.notificationCount++;
    const id = config.id ?? `__arco_notification_${this.notificationCount}`;
    if (this.notificationIds.has(id)) {
      return this.update(id, config);
    }
    const notification: NotificationItem = reactive({ id, ...config });
    this.notifications.value.push(notification);
    this.notificationIds.add(id);

    return {
      close: () => this.remove(id),
    };
  };

  update = (id: number | string, config: _NotificationConfig) => {
    for (let i = 0; i < this.notifications.value.length; i++) {
      if (this.notifications.value[i].id === id) {
        const resetOnUpdate = !isUndefined(config.duration);
        Object.assign(this.notifications.value[i], {
          ...config,
          id,
          resetOnUpdate,
        });
        break;
      }
    }
    return {
      close: () => this.remove(id),
    };
  };

  remove = (id: number | string) => {
    for (let i = 0; i < this.notifications.value.length; i++) {
      const item = this.notifications.value[i];

      if (item.id === id) {
        if (isFunction(item.onClose)) {
          item.onClose(id);
        }

        this.notifications.value.splice(i, 1);
        this.notificationIds.delete(id);
        break;
      }
    }
  };

  clear = () => {
    this.notifications.value.splice(0);
  };

  destroy = () => {
    if (this.notifications.value.length === 0) {
      render(null, this.container);
      try {
        document.body.removeChild(this.container);
        notificationInstance[this.position] = undefined;
      } catch (err) {}
    }
  };
}

const notificationInstance: {
  topLeft?: NotificationManger;
  topRight?: NotificationManger;
  bottomLeft?: NotificationManger;
  bottomRight?: NotificationManger;
} = {};

const notification = MESSAGE_TYPES.reduce((pre, value) => {
  pre[value] = (config) => {
    if (isString(config)) {
      config = { content: config };
    }

    const _config: _NotificationConfig = { type: value, ...config };
    const { position = 'topRight' } = _config;
    if (!notificationInstance[position]) {
      notificationInstance[position] = new NotificationManger(_config);
    }
    return notificationInstance[position]!.add(_config);
  };
  return pre;
}, {} as NotificationMethod);

notification.clear = (position?: NotificationPosition) => {
  if (position) {
    notificationInstance[position]?.clear();
  } else {
    Object.values(notificationInstance).forEach((item) => item.clear());
  }
};

const Notification = {
  ...notification,
  install: (app: App) => {
    app.config.globalProperties.$notification = notification;
  },
};

export default Notification;
