import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';
import type { MenuProps } from './interface';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _MenuItem from './item';
import _MenuItemGroup from './item-group.vue';
import _Menu from './menu';
import _MenuSubMenu from './sub-menu';

export type {
  MenuData,
  MenuDataItem,
  MenuEllipsisProps,
  MenuItemGroupProps,
  MenuItemProps,
  MenuMode,
  MenuProps,
  MenuTheme,
  PopupMenuMaxHeightType,
  SubMenuChildDataType,
  SubMenuProps,
} from './interface';

export type MenuCollapseTrigger = 'clickTrigger' | 'responsive';
export type MenuCollapseHandler = (collapsed: boolean, type: MenuCollapseTrigger) => void;
export type MenuItemClickHandler = (key: string) => void;
export type MenuSubMenuClickHandler = (key: string, openKeys: string[]) => void;

const Menu: typeof _Menu & {
  Item: typeof _MenuItem;
  ItemGroup: typeof _MenuItemGroup;
  SubMenu: typeof _MenuSubMenu;
  install: (app: App, options?: SDOptions) => void;
} = Object.assign(_Menu, {
  Item: _MenuItem,
  ItemGroup: _MenuItemGroup,
  SubMenu: _MenuSubMenu,
  install: (app: App, options?: SDOptions) => {
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
export type MenuOpenKeys = NonNullable<MenuProps['openKeys']>;
export type MenuSelectedKeys = NonNullable<MenuProps['selectedKeys']>;

export { _MenuItem as MenuItem, _MenuItemGroup as MenuItemGroup, _MenuSubMenu as SubMenu };

export default Menu;
