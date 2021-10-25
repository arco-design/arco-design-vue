import { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Split from './split.vue';

const Split = Object.assign(_Split, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Split.name, _Split);
  },
});

export type SplitInstance = InstanceType<typeof _Split>;

export default Split;
