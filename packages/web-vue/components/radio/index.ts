import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Radio from './radio';
import _RadioGroup from './radio-group';

const Radio = Object.assign(_Radio, {
  Group: _RadioGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Radio.name, _Radio);
    app.component(componentPrefix + _RadioGroup.name, _RadioGroup);
  },
});

export type RadioInstance = InstanceType<typeof _Radio>;
export type RadioGroupInstance = InstanceType<typeof _RadioGroup>;

export { _RadioGroup as RadioGroup };

export default Radio;
