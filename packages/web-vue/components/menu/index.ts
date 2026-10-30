import type { App } from 'vue';
import type { ArcoOptions, SFCWithInstall } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Menu from './menu';
import _MenuItem from './item';
import _MenuItemGroup from './item-group.vue';
import _MenuSubMenu from './sub-menu';

// 显式标注：推断类型会引用 @vue/shared 的内部路径，生成的 .d.ts 不可移植
const Menu: SFCWithInstall<
  typeof _Menu,
  {
    Item: typeof _MenuItem;
    ItemGroup: typeof _MenuItemGroup;
    SubMenu: typeof _MenuSubMenu;
  }
> = Object.assign(_Menu, {
  Item: _MenuItem,
  ItemGroup: _MenuItemGroup,
  SubMenu: _MenuSubMenu,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Menu.name, _Menu);
    app.component(componentPrefix + _MenuItem.name, _MenuItem);
    app.component(componentPrefix + _MenuItemGroup.name, _MenuItemGroup);
    app.component(componentPrefix + _MenuSubMenu.name, _MenuSubMenu);
  },
});

export type MenuInstance = InstanceType<typeof _Menu>;
export type MenuItemInstance = InstanceType<typeof _MenuItem>;
export type MenuItemGroupInstance = InstanceType<typeof _MenuItemGroup>;
export type MenuSubMenuInstance = InstanceType<typeof _MenuSubMenu>;

export {
  _MenuItem as MenuItem,
  _MenuItemGroup as MenuItemGroup,
  _MenuSubMenu as SubMenu,
};

export default Menu;
