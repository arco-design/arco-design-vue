import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';
import type { ScrollbarExpose } from './interface';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Scrollbar from './scrollbar.vue';

const Scrollbar = Object.assign(_Scrollbar, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Scrollbar.name, _Scrollbar);
  },
});

export type ScrollbarInstance = InstanceType<typeof _Scrollbar> & ScrollbarExpose;
export type {
  ScrollbarElements,
  ScrollbarEventListener,
  ScrollbarEventListenerArgs,
  ScrollbarEventListeners,
  ScrollbarExpose,
  ScrollbarOptions,
  ScrollbarOptionsResolved,
  ScrollbarPlugin,
  ScrollbarProps,
  ScrollbarReadonlyOptions,
  ScrollbarState,
  ScrollbarType,
  ScrollbarUpdatedEvent,
} from './interface';

export default Scrollbar;
