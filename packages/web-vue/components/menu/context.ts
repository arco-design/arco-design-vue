import { InjectionKey, VNodeTypes } from 'vue';
import { MenuProps } from './interface';

export const MenuInjectionKey: InjectionKey<string> =
  Symbol('MenuInjectionKey');

export type MenuContext = Readonly<
  Pick<
    MenuProps,
    | 'mode'
    | 'theme'
    | 'levelIndent'
    | 'autoScrollIntoView'
    | 'scrollConfig'
    | 'inTrigger'
    | 'triggerProps'
    | 'tooltipProps'
  > & {
    selectedKeys: string[];
    openKeys: string[];
    prefixCls: string;
    collapsed: boolean;
    expandIconDown?: () => VNodeTypes;
    expandIconRight?: () => VNodeTypes;
    onSubMenuClick?: (key: string, level: number) => void;
    onMenuItemClick?: (key: string) => void;
  }
>;

export const LevelInjectionKey: InjectionKey<string> =
  Symbol('LevelInjectionKey');

export type LevelContext = Readonly<{
  level: number;
}>;

export const DataCollectorInjectionKey: InjectionKey<string> = Symbol(
  'DataCollectorInjectionKey'
);

export type DataCollectorContext = Readonly<{
  collectSubMenuKey: (keys: string) => void;
  removeSubMenuKey: (keys: string) => void;
  updateSubMenuKeys: (keys: string[], prevKeys: string[]) => void;
  collectMenuItemKey: (keys: string) => void;
  removeMenuItemKey: (keys: string) => void;
  updateMenuItemKeys: (keys: string[], prevKeys: string[]) => void;
}>;
