import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _InputNumber from './input-number';

const InputNumber = Object.assign(_InputNumber, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _InputNumber.name, _InputNumber);
  },
});

export type InputNumberInstance = InstanceType<typeof _InputNumber>;

export default InputNumber;
