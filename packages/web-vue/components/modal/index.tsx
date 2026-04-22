import type { App, AppContext } from 'vue';
import { nextTick, createVNode, render } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import { MESSAGE_TYPES } from '../_utils/constant';
import { getOverlay } from '../_utils/dom';
import { isFunction } from '../_utils/is';
import _Modal from './modal.vue';
import type {
  ModalConfig,
  ModalGlobalConfig,
  ModalMethod,
  ModalUpdateConfig,
} from './interface';
import { omit } from '../_utils/omit';
import { getSlotFunction } from '../_utils/vue-utils';

type ModalOpenMethod = Pick<
  ModalMethod,
  'open' | 'confirm' | 'info' | 'success' | 'warning' | 'error'
>;

const defaultModalGlobalConfig: ModalGlobalConfig = {
  simple: true,
};

let modalGlobalConfig: ModalGlobalConfig = {
  ...defaultModalGlobalConfig,
};

const modalDestroyList: Array<() => void> = [];

const setModalGlobalConfig = (config: ModalGlobalConfig) => {
  modalGlobalConfig = {
    ...modalGlobalConfig,
    ...config,
  };
};

const getModalGlobalConfig = () => modalGlobalConfig;

const removeModalDestroyFn = (destroyFn: () => void) => {
  const index = modalDestroyList.findIndex((item) => item === destroyFn);
  if (index > -1) {
    modalDestroyList.splice(index, 1);
  }
};

const open = (config: ModalConfig, appContext?: AppContext) => {
  let container: HTMLElement | null = getOverlay('modal');
  let closed = false;

  const destroyModal = () => {
    if (closed) {
      return;
    }
    closed = true;
    if (container) {
      render(null, container);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
    container = null;
    removeModalDestroyFn(destroyModal);

    if (isFunction(config.onClose)) {
      config.onClose();
    }
  };

  const closeModal = () => {
    if (vm.component) {
      vm.component.props.visible = false;
    }
  };

  const handleOk = () => {
    closeModal();

    if (isFunction(config.onOk)) {
      config.onOk();
    }
  };

  const handleCancel = () => {
    closeModal();

    if (isFunction(config.onCancel)) {
      config.onCancel();
    }
  };

  const handleClose = async () => {
    await nextTick();
    destroyModal();
  };

  const handleReturnClose = () => {
    closeModal();
  };

  const handleUpdateConfig = (config: ModalUpdateConfig) => {
    if (vm.component) {
      Object.entries(config).forEach(([key, value]) => {
        vm.component!.props[key] = value;
      });
    }
  };

  const defaultConfig = {
    visible: true,
    renderToBody: false,
    unmountOnClose: true,
    onOk: handleOk,
    onCancel: handleCancel,
    onClose: handleClose,
  };

  // @ts-ignore
  const vm = createVNode(
    _Modal,
    {
      ...defaultConfig,
      ...omit(config, [
        'content',
        'title',
        'footer',
        'visible',
        'unmountOnClose',
        'onOk',
        'onCancel',
        'onClose',
      ]),
      ...{
        footer: typeof config.footer === 'boolean' ? config.footer : undefined,
      },
    },
    {
      default: getSlotFunction(config.content),
      title: getSlotFunction(config.title),
      footer:
        typeof config.footer !== 'boolean'
          ? getSlotFunction(config.footer)
          : undefined,
    }
  );

  if (appContext ?? Modal._context) {
    vm.appContext = appContext ?? Modal._context;
  }

  render(vm, container);
  document.body.appendChild(container);
  modalDestroyList.push(destroyModal);

  return {
    close: handleReturnClose,
    update: handleUpdateConfig,
  };
};

const modal: ModalOpenMethod = {
  open,
  confirm: (config: ModalConfig, appContext?: AppContext) => {
    const { simple } = getModalGlobalConfig();
    const _config = { simple, messageType: 'warning', ...config };

    return open(_config, appContext);
  },
  ...MESSAGE_TYPES.reduce((pre, value) => {
    pre[value] = (config: ModalConfig, appContext?: AppContext) => {
      const { simple } = getModalGlobalConfig();
      const _config = {
        simple,
        hideCancel: true,
        messageType: value,
        ...config,
      };
      return open(_config, appContext);
    };

    return pre;
  }, {} as Pick<ModalMethod, 'info' | 'success' | 'warning' | 'error'>),
};

const config = (config: ModalGlobalConfig) => {
  setModalGlobalConfig(config);
};

const destroyAll = () => {
  while (modalDestroyList.length) {
    const close = modalDestroyList.pop();
    close?.();
  }
};

const Modal = Object.assign(_Modal, {
  ...modal,
  config,
  destroyAll,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Modal.name, _Modal);

    const modalWithContext = {} as ModalMethod;

    for (const key of Object.keys(modal) as (keyof ModalOpenMethod)[]) {
      modalWithContext[key] = (config, appContext = app._context) =>
        modal[key](config, appContext);
    }
    modalWithContext.config = config;
    modalWithContext.destroyAll = destroyAll;

    app.config.globalProperties.$modal = modalWithContext;
  },
  _context: null as AppContext | null,
});

export type {
  ModalMethod,
  ModalConfig,
  ModalGlobalConfig,
  ModalReturn,
} from './interface';

export default Modal;
