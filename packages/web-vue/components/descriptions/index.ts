import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Descriptions from './descriptions';

const Descriptions = Object.assign(_Descriptions, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Descriptions.name, _Descriptions);
  },
});

export type DescriptionsInstance = InstanceType<typeof _Descriptions>;

export default Descriptions;
