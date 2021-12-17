import { CSSProperties, VNode } from 'vue';
import { Data } from '../_utils/types';

export type MenuTheme = 'light' | 'dark';

export type MenuMode = 'vertical' | 'horizontal' | 'pop' | 'popButton';

export interface SubMenuChildDataType {
  key: string;
  children?: SubMenuChildDataType[];
}

export interface MenuProps {
  style?: CSSProperties;
  theme?: MenuTheme;
  mode: MenuMode;
  levelIndent?: number;
  autoOpen: boolean;
  collapsed: boolean | undefined;
  defaultCollapsed: boolean;
  collapsedWidth?: number;
  accordion: boolean;
  autoScrollIntoView: boolean;
  showCollapseButton: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys: string[];
  openKeys?: string[];
  defaultOpenKeys: string[];
  scrollConfig?: { [key: string]: any };
  triggerProps?: Data;
  tooltipProps?: Data;
  autoOpenSelected: boolean;
  // internal
  prefixCls?: string;
  inTrigger: boolean;
  siderCollapsed: boolean;
  isRoot: boolean;
}

export interface SubMenuProps {
  key?: string;
  title?: string;
  selectable: boolean;
  popup: boolean | ((level: number) => boolean);
}

export interface MenuItemGroupProps {
  title?: string;
}

export interface MenuItemProps {
  key?: string;
  disabled?: boolean;
}

export interface SubMenuInlineProps {
  title?: string;
  isChildrenSelected: boolean;
}

export interface SubMenuPopProps {
  title?: string;
  selectable: boolean;
  isChildrenSelected: boolean;
}

export interface MenuDataItem {
  key: string;
  children?: MenuData;
}

export type MenuData = MenuDataItem[];
