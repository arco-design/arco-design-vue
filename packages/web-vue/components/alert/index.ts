import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Alert from './alert.vue';

const Alert = Object.assign(_Alert, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Alert.name, _Alert);
  },
});

export type AlertInstance = InstanceType<typeof _Alert>;

export default Alert;
