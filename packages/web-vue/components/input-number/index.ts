import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _InputNumber from './input-number';

export type InputNumberValue = number | undefined;
export type InputNumberFormatter = (value: string | number | undefined) => string;
export type InputNumberParser = (value: string) => string | number;
export type InputNumberChangeHandler = (value: InputNumberValue, event: Event) => void;
export type InputNumberInputHandler = (
  value: InputNumberValue,
  inputValue: string,
  event: Event,
) => void;

const InputNumber = Object.assign(_InputNumber, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _InputNumber.name, _InputNumber);
  },
});

export type InputNumberInstance = InstanceType<typeof _InputNumber>;

export default InputNumber;
