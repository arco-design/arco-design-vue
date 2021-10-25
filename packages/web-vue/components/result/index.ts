import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Result from './result.vue';

const Result = Object.assign(_Result, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Result.name, _Result);
  },
});

export type ResultInstance = InstanceType<typeof _Result>;

export default Result;
