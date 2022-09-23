import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Dropdown from './dropdown.vue';
import _DropdownOption from './dropdown-option.vue';
import _DropdownGroup from './dropdown-group.vue';
import _DropdownSubmenu from './dropdown-submenu.vue';
import _DropdownButton from './dropdown-button.vue';

const Dropdown = Object.assign(_Dropdown, {
  Option: _DropdownOption,
  Group: _DropdownGroup,
  Submenu: _DropdownSubmenu,
  Button: _DropdownButton,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Dropdown.name, _Dropdown);
    app.component(componentPrefix + _DropdownOption.name, _DropdownOption);
    app.component(componentPrefix + _DropdownGroup.name, _DropdownGroup);
    app.component(componentPrefix + _DropdownSubmenu.name, _DropdownSubmenu);
    app.component(componentPrefix + _DropdownButton.name, _DropdownButton);
  },
});

export type DropdownInstance = InstanceType<typeof _Dropdown>;
export type DropdownOptionInstance = InstanceType<typeof _DropdownOption>;
export type DropdownGroupInstance = InstanceType<typeof _DropdownGroup>;
export type DropdownSubmenuInstance = InstanceType<typeof _DropdownSubmenu>;
export type DropdownButtonInstance = InstanceType<typeof _DropdownButton>;

export type {
  DropDownProps,
  DropdownOption,
  DOption,
  DGroup,
  DSubmenu,
} from './interface';

export {
  _DropdownOption as Doption,
  _DropdownGroup as Dgroup,
  _DropdownSubmenu as Dsubmenu,
  _DropdownButton as DropdownButton,
};

export default Dropdown;
