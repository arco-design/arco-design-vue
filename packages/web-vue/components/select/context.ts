import type { InjectionKey } from 'vue';
import type { FilterOption, OptionInfo } from './interface';

export interface SelectContext {
  multiple?: boolean;
  valueKey?: string;
  inputValue?: string;
  filterOption?: FilterOption;
  component?: string;
  valueKeys: string[];
  activeKey: string | undefined;
  onSelect: (key: string, ev: Event) => void;
  setActiveKey: (key?: string) => void;
  addSlotOptionInfo: (key: string, optionInfo: OptionInfo) => void;
  removeSlotOptionInfo: (key: string) => void;
}

export const selectInjectionKey: InjectionKey<SelectContext> =
  Symbol('ArcoSelectContext');
