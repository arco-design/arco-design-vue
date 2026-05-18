import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Secret from './secret.vue';

const Secret = Object.assign(_Secret, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Secret.name, _Secret);
  },
});

export type SecretInstance = InstanceType<typeof _Secret>;

export default Secret;
