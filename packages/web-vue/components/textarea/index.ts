import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Textarea from './textarea.vue';

const Textarea = Object.assign(_Textarea, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Textarea.name, _Textarea);
  },
});

export type LinkInstance = InstanceType<typeof _Textarea>;

export default Textarea;
