import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Select from './select';

const Select = Object.assign(_Select, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Select.name, _Select);
  },
});

export type SelectInstance = InstanceType<typeof _Select>;
export type {
  SelectProps,
  SelectOption,
  SelectOptionData,
  SelectOptionGroup,
  SelectFieldNames,
  FilterOption,
  SelectFallbackOption,
} from './interface';

export default Select;
