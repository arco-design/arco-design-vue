import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Rate from './rate';

const Rate = Object.assign(_Rate, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Rate.name, _Rate);
  },
});

export type RateInstance = InstanceType<typeof _Rate>;

export default Rate;
