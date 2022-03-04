import { InjectionKey, Slots } from 'vue';
import { CascaderOption, CascaderOptionInfo } from './interface';

interface CascaderContext {
  onClickOption: (option: CascaderOptionInfo, checked?: boolean) => void;
  setActiveKey: (key?: string) => void;
  setSelectedPath: (key?: string) => void;
  loadMore: (
    option: CascaderOptionInfo,
    done: (children?: CascaderOption[]) => void
  ) => void;
  addLazyLoadOptions: (children: CascaderOption[], key: string) => void;
  formatLabel: (options: CascaderOptionInfo[]) => string;
  slots: Slots;
}

export const cascaderInjectionKey: InjectionKey<CascaderContext> =
  Symbol('ArcoCascader');
