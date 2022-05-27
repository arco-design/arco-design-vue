import { InjectionKey, Slots } from 'vue';
import { CascaderOption, CascaderOptionInfo } from './interface';
import { UnionType } from '../_utils/types';

export interface CascaderContext {
  onClickOption: (option: CascaderOptionInfo, checked?: boolean) => void;
  setActiveKey: (key?: string) => void;
  setSelectedPath: (key?: string) => void;
  loadMore: (
    option: CascaderOption,
    done: (children?: CascaderOption[]) => void
  ) => void;
  addLazyLoadOptions: (children: CascaderOption[], key: string) => void;
  formatLabel: (options: CascaderOption[]) => string;
  slots: Slots;
  valueMap: Map<string, UnionType | UnionType[]>;
  expandTrigger: 'click' | 'hover';
}

export const cascaderInjectionKey: InjectionKey<CascaderContext> =
  Symbol('ArcoCascader');
