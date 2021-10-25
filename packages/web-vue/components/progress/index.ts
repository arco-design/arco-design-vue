import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Progress from './progress.vue';

const Progress = Object.assign(_Progress, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Progress.name, _Progress);
  },
});

export type ProgressInstance = InstanceType<typeof _Progress>;

export default Progress;
