import type { App, CreateComponentPublicInstance } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Select, { SelectProps } from './select';
import _Option from './option';
import _Optgroup from './optgroup';

const Select = Object.assign(_Select, {
  Option: _Option,
  OptGroup: _Optgroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Select.displayName, _Select);
    app.component(componentPrefix + _Option.name, _Option);
    app.component(componentPrefix + _Optgroup.name, _Optgroup);
  },
});

export type SelectInstance = CreateComponentPublicInstance<SelectProps>;
export type SelectOptionInstance = InstanceType<typeof _Option>;
export type SelectOptGroupInstance = InstanceType<typeof _Optgroup>;

export default Select;
