import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Optgroup from './optgroup.vue';
import _Option from './option.vue';
import _Select from './select';

const Select = Object.assign(_Select, {
  Option: _Option,
  OptGroup: _Optgroup,
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Select.name, _Select);
    app.component(componentPrefix + _Option.name, _Option);
    app.component(componentPrefix + _Optgroup.name, _Optgroup);
  },
});

export type SelectInstance = InstanceType<typeof _Select>;
export type SelectOptionInstance = InstanceType<typeof _Option>;
export type SelectOptGroupInstance = InstanceType<typeof _Optgroup>;
export type {
  SelectProps,
  SelectOption,
  SelectOptionData,
  SelectOptionGroup,
  SelectFieldNames,
  FilterOption,
  SelectFallbackOption,
} from './interface';

export { _Option as Option, _Optgroup as Optgroup };

export default Select;
