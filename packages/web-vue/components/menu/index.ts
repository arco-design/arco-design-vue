import type { App } from 'vue';
import type { ArcoOptions, SFCWithInstall } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Menu from './menu';
import _BaseMenu from './base-menu.vue';
import _MenuItem from './item';
import _MenuItemGroup from './item-group.vue';
import _MenuSubMenu from './sub-menu';

type MenuPlugin = SFCWithInstall<
  // 运行时默认导出是包装组件（只声明 theme/mode，其余 props 通过 attrs 透传给 BaseMenu），
  // 对外类型必须用 BaseMenu，否则 Menu 的 23 个公开 props 在类型上会「消失」。
  typeof _BaseMenu,
  {
    Item: typeof _MenuItem;
    ItemGroup: typeof _MenuItemGroup;
    SubMenu: typeof _MenuSubMenu;
  }
>;

// 显式标注：推断类型会引用 @vue/shared 的内部路径，生成的 .d.ts 不可移植
const Menu: MenuPlugin = Object.assign(_Menu, {
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
}) as unknown as MenuPlugin;

export type MenuInstance = InstanceType<typeof _BaseMenu>;
export type MenuItemInstance = InstanceType<typeof _MenuItem>;
export type MenuItemGroupInstance = InstanceType<typeof _MenuItemGroup>;
export type MenuSubMenuInstance = InstanceType<typeof _MenuSubMenu>;

export {
  _MenuItem as MenuItem,
  _MenuItemGroup as MenuItemGroup,
  _MenuSubMenu as SubMenu,
};

export default Menu;
