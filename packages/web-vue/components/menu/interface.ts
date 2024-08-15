import { StyleValue } from 'vue';
import { Breakpoint } from '../_utils/responsive-observe';
import { Data } from '../_utils/types';
import { TriggerProps } from '../trigger';

export type MenuTheme = 'light' | 'dark';

export type MenuMode = 'vertical' | 'horizontal' | 'pop' | 'popButton';

export interface SubMenuChildDataType {
  key: string;
  children?: SubMenuChildDataType[];
}

export type PopupMenuMaxHeightType = boolean | number;

export interface MenuProps {
  style: StyleValue | undefined;
  theme: MenuTheme | undefined;
  mode: MenuMode;
  levelIndent: number | undefined;
  autoOpen: boolean;
  collapsed: boolean | undefined;
  defaultCollapsed: boolean;
  collapsedWidth: number | undefined;
  accordion: boolean;
  autoScrollIntoView: boolean;
  showCollapseButton: boolean;
  selectedKeys: string[] | undefined;
  defaultSelectedKeys: string[];
  openKeys: string[] | undefined;
  defaultOpenKeys: string[];
  scrollConfig: { [key: string]: any } | undefined;
  triggerProps: TriggerProps | undefined;
  tooltipProps: Data | undefined;
  autoOpenSelected: boolean;
  breakpoint: Breakpoint | undefined;
  popupMaxHeight: PopupMenuMaxHeightType;
}

export interface InternalMenuProps extends MenuProps {
  prefixCls: string | undefined;
  inTrigger: boolean;
  siderCollapsed: boolean;
  isRoot: boolean;
}

export interface SubMenuProps {
  key: string | undefined;
  title: string | undefined;
  selectable: boolean;
  popup: boolean | ((level: number) => boolean);
  popupMaxHeight: PopupMenuMaxHeightType | undefined;
}

export interface MenuItemGroupProps {
  title: string | undefined;
}

export interface MenuItemProps {
  key: string | undefined;
  disabled?: boolean;
}

export interface SubMenuInlineProps {
  title: string | undefined;
  isChildrenSelected: boolean;
}

export interface SubMenuPopProps {
  title: string | undefined;
  selectable: boolean;
  isChildrenSelected: boolean;
  popupMaxHeight: PopupMenuMaxHeightType | undefined;
}

export interface MenuDataItem {
  key: string;
  children?: MenuData;
}

export type MenuData = MenuDataItem[];
