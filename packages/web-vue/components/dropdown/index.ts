import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Dropdown from './dropdown';
import _DropdownOption from './dropdown-option';
import _DropdownGroup from './dropdown-group';
import _DropdownSubmenu from './dropdown-submenu';

const Dropdown = Object.assign(_Dropdown, {
  Option: _DropdownOption,
  Group: _DropdownGroup,
  Submenu: _DropdownSubmenu,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Dropdown.name, _Dropdown);
    app.component(componentPrefix + _DropdownOption.name, _DropdownOption);
    app.component(componentPrefix + _DropdownGroup.name, _DropdownGroup);
    app.component(componentPrefix + _DropdownSubmenu.name, _DropdownSubmenu);
  },
});

export type DropdownInstance = InstanceType<typeof _Dropdown>;
export type DropdownOptionInstance = InstanceType<typeof _DropdownOption>;
export type DropdownGroupInstance = InstanceType<typeof _DropdownGroup>;
export type DropdownSubmenuInstance = InstanceType<typeof _DropdownSubmenu>;

export default Dropdown;
