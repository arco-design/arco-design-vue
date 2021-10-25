import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Select from './select';
import { DropDownOption, DropDownOptGroup } from '../_components/dropdown';

const Select = Object.assign(_Select, {
  Option: DropDownOption,
  OptGroup: DropDownOptGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Select.name, _Select);
    app.component(componentPrefix + DropDownOption.name, DropDownOption);
    app.component(componentPrefix + DropDownOptGroup.name, DropDownOptGroup);
  },
});

export type SelectInstance = InstanceType<typeof _Select>;
export type SelectOptionInstance = InstanceType<typeof DropDownOption>;
export type SelectOptGroupInstance = InstanceType<typeof DropDownOptGroup>;
export type SelectProps = SelectInstance['$props'];

export default Select;
