import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Copy from './copy.vue';

const Copy = Object.assign(_Copy, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Copy.name, _Copy);
  },
});

export type CopyInstance = InstanceType<typeof _Copy>;
export type { CopyButtonProps, CopyComponentType, CopyLinkProps, CopyProps } from './types';

export default Copy;
