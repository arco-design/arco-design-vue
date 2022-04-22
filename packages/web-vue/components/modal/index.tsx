import type { App, AppContext } from 'vue';
import { createVNode, render } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import { MESSAGE_TYPES } from '../_utils/constant';
import { getOverlay } from '../_utils/dom';
import { isFunction } from '../_utils/is';
import _Modal from './modal.vue';
import { ModalConfig, ModalMethod } from './interface';
import { omit } from '../_utils/omit';
import { getSlotFunction } from '../_utils/vue-utils';

const open = (config: ModalConfig, appContext?: AppContext) => {
  let container: HTMLElement | null = getOverlay('modal');

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
    if (container) {
      render(null, container);
      document.body.removeChild(container);
    }
    container = null;

    if (isFunction(config.onClose)) {
      config.onClose();
    }
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
    { ...omit(config, ['content', 'title', 'footer']), ...defaultConfig },
    {
      default: getSlotFunction(config.content),
      title: getSlotFunction(config.title),
      footer: getSlotFunction(config.footer),
    }
  );

  if (appContext ?? Modal._context) {
    vm.appContext = appContext ?? Modal._context;
  }

  render(vm, container);
  document.body.appendChild(container);

  return {
    close: handleClose,
  };
};

const modal: ModalMethod = {
  open,
  confirm: (config: ModalConfig, appContext?: AppContext) => {
    const _config = { simple: true, ...config };

    return open(_config, appContext);
  },
  ...MESSAGE_TYPES.reduce((pre, value) => {
    pre[value] = (config: ModalConfig, appContext?: AppContext) => {
      const _config = {
        simple: true,
        hideCancel: true,
        messageType: value,
        ...config,
      };
      return open(_config, appContext);
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

    const modalWithContext = {} as ModalMethod;

    for (const key of Object.keys(modal) as (keyof ModalMethod)[]) {
      modalWithContext[key] = (config, appContext = app._context) =>
        modal[key](config, appContext);
    }

    app.config.globalProperties.$modal = modalWithContext;
  },
  _context: null as AppContext | null,
});

export type { ModalMethod, ModalConfig, ModalReturn } from './interface';

export default Modal;
