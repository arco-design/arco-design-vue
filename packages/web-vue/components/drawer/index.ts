import type { App, AppContext } from 'vue';
import { createVNode, nextTick, render } from 'vue';
import { getOverlay } from '../_utils/dom';
import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import { isFunction } from '../_utils/is';
import { omit } from '../_utils/omit';
import { ArcoOptions } from '../_utils/types';
import { getSlotFunction } from '../_utils/vue-utils';
import _Drawer from './drawer.vue';
import type {
  DrawerConfig,
  DrawerMethod,
  DrawerUpdateConfig,
} from './interface';

const open = (config: DrawerConfig, appContext?: AppContext) => {
  let container: HTMLElement | null = getOverlay('drawer');

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

  const handleClose = async () => {
    await nextTick();
    if (container) {
      render(null, container);
      document.body.removeChild(container);
    }
    container = null;

    if (isFunction(config.onClose)) {
      config.onClose();
    }
  };

  const handleReturnClose = () => {
    if (vm.component) {
      vm.component.props.visible = false;
    }
  };

  const handleUpdateConfig = (config: DrawerUpdateConfig) => {
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
    _Drawer,
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
        header: typeof config.header === 'boolean' ? config.header : undefined,
        footer: typeof config.footer === 'boolean' ? config.footer : undefined,
      },
    },
    {
      default: getSlotFunction(config.content),
      header:
        typeof config.header !== 'boolean'
          ? getSlotFunction(config.header)
          : undefined,
      title: getSlotFunction(config.title),
      footer:
        typeof config.footer !== 'boolean'
          ? getSlotFunction(config.footer)
          : undefined,
    }
  );

  if (appContext ?? Drawer._context) {
    vm.appContext = appContext ?? Drawer._context;
  }

  render(vm, container);
  document.body.appendChild(container);

  return {
    close: handleReturnClose,
    update: handleUpdateConfig,
  };
};

const Drawer = Object.assign(_Drawer, {
  open,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Drawer.name, _Drawer);

    const drawerWithContext: DrawerMethod = {
      open: (config, appContext = app._context) => open(config, appContext),
    };

    app.config.globalProperties.$drawer = drawerWithContext;
  },
  _context: null as AppContext | null,
});

export type { DrawerMethod, DrawerConfig, DrawerReturn } from './interface';

export type DrawerInstance = InstanceType<typeof _Drawer>;

export default Drawer;
