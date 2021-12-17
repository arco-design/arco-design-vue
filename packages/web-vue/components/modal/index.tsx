import type { App } from 'vue';
import { createVNode, render } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import { MESSAGE_TYPES } from '../_utils/constant';
import { getOverlay } from '../_utils/dom';
import { isFunction } from '../_utils/is';
import _Modal from './modal.vue';
import { ModalConfig, ModalMethod } from './interface';

const open = (config: ModalConfig) => {
  const container = getOverlay('modal');

  const handleOk = () => {
    if (vm.component) {
      vm.component.props.visible = false;
    }

    if (isFunction(config.onOk)) {
      config.onOk();
    }
  };

  const handleCancel = () => {
    if (vm.component) {
      vm.component.props.visible = false;
    }

    if (isFunction(config.onCancel)) {
      config.onCancel();
    }
  };

  const handleClose = () => {
    render(null, container);
    document.body.removeChild(container);
  };

  const defaultConfig = {
    visible: true,
    renderToBody: false,
    onOk: handleOk,
    onCancel: handleCancel,
    onClose: handleClose,
  };

  // @ts-ignore
  const vm = createVNode(
    _Modal,
    { ...config, ...defaultConfig },
    {
      default: isFunction(config.content)
        ? config.content
        : () => config.content,
      title: isFunction(config.title) ? config.title : () => config.title,
      footer: isFunction(config.footer) ? config.footer : () => config.footer,
    }
  );

  render(vm, container);
  document.body.appendChild(container);

  return {
    // eslint-disable-next-line no-restricted-globals
    close,
  };
};

const modal: ModalMethod = {
  open,
  confirm: (config: ModalConfig) => {
    const _config = { simple: true, ...config };

    return open(_config);
  },
  ...MESSAGE_TYPES.reduce((pre, value) => {
    pre[value] = (config: ModalConfig) => {
      const _config = {
        simple: true,
        hideCancel: true,
        messageType: value,
        ...config,
      };
      return open(_config);
    };

    return pre;
  }, {} as Pick<ModalMethod, 'info' | 'success' | 'warning' | 'error'>),
};

const Modal = Object.assign(_Modal, {
  ...modal,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Modal.name, _Modal);
    app.config.globalProperties.$modal = modal;
  },
});

export default Modal;
