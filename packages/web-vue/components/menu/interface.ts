import { CSSProperties } from 'vue';
import { Data } from '../_utils/types';

export interface SubMenuChildDataType {
  key: string;
  children?: SubMenuChildDataType[];
}

export interface MenuProps {
  style?: CSSProperties;
  theme: 'light' | 'dark';
  mode: 'vertical' | 'horizontal' | 'pop' | 'popButton';
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
  // internal
  prefixCls?: string;
  inTrigger: boolean;
  siderCollapsed: boolean;
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
}

export interface SubMenuPopProps {
  title?: string;
  selectable: boolean;
}
