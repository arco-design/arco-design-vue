import type { App, AppContext, Ref } from 'vue';
import { createVNode, render, ref, reactive } from 'vue';
import { MESSAGE_TYPES, MessageType } from '../_utils/constant';
import { getOverlay } from '../_utils/dom';
import { isString, isUndefined } from '../_utils/is';
import MessageList from './message-list';
import {
  MessageConfig,
  MessageItem,
  MessageMethod,
  MessagePosition,
} from './interface';

type _MessageConfig = MessageConfig & { type: MessageType };

class MessageManger {
  private readonly container: HTMLElement;

  private readonly messageIds: Set<number | string>;

  private readonly messages: Ref<MessageItem[]>;

  private messageCount = 0;

  constructor(config: _MessageConfig, appContext?: AppContext) {
    const { position } = config;
    this.container = getOverlay('message');
    this.messageIds = new Set();
    this.messages = ref([]);

    const vm = createVNode(MessageList, {
      messages: this.messages.value,
      position,
      onClose: this.remove,
    });

    if (appContext) {
      vm.appContext = appContext;
    }
    render(vm, this.container);
    document.body.appendChild(this.container);
  }

  add = (config: _MessageConfig) => {
    this.messageCount++;
    const id = config.id ?? `__arco_message_${this.messageCount}`;
    if (this.messageIds.has(id)) {
      return this.update(id, config);
    }
    const message: MessageItem = reactive({ id, ...config });
    this.messages.value.push(message);
    this.messageIds.add(id);
    return {
      close: () => this.remove(id),
    };
  };

  update = (id: number | string, config: _MessageConfig) => {
    for (let i = 0; i < this.messages.value.length; i++) {
      if (this.messages.value[i].id === id) {
        const resetOnUpdate = !isUndefined(config.duration);
        Object.assign(this.messages.value[i], { ...config, id, resetOnUpdate });
        break;
      }
    }
    return {
      close: () => this.remove(id),
    };
  };

  remove = (id: number | string) => {
    for (let i = 0; i < this.messages.value.length; i++) {
      if (this.messages.value[i].id === id) {
        this.messages.value.splice(i, 1);
        this.messageIds.delete(id);
        break;
      }
    }
  };

  clear = () => {
    this.messages.value.splice(0);
  };
}

const messageInstance: {
  top?: MessageManger;
  bottom?: MessageManger;
} = {};

const message = MESSAGE_TYPES.reduce((pre, value) => {
  pre[value] = (config) => {
    if (isString(config)) {
      config = { content: config };
    }
    const _config: _MessageConfig = { type: value, ...config };
    const { position = 'top' } = _config;
    if (!messageInstance[position]) {
      messageInstance[position] = new MessageManger(_config);
    }
    return messageInstance[position]!.add(_config);
  };
  return pre;
}, {} as MessageMethod);

message.clear = (position?: MessagePosition) => {
  if (position) {
    messageInstance[position]?.clear();
  } else {
    Object.values(messageInstance).forEach((item) => item.clear());
  }
};

const Message = {
  ...message,
  install: (app: App): void => {
    app.config.globalProperties.$message = message;
  },
};

export default Message;
