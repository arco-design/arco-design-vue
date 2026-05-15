import type { App } from 'vue';

import type { SDOptions, SFCWithInstall } from '../_utils/types';
import type { TreeSelectProps } from './interface';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _TreeSelect from './tree-select.vue';

export type {
  ChangeHandler as TreeSelectChangeHandler,
  ClearHandler as TreeSelectClearHandler,
  FallbackOption as TreeSelectFallbackOption,
  FilterTreeNode as TreeSelectFilterTreeNode,
  LabelValue,
  PopupVisibleChangeHandler as TreeSelectPopupVisibleChangeHandler,
  SearchHandler as TreeSelectSearchHandler,
  TreeSelectProps,
  TreeSelectValue,
} from './interface';

const TreeSelect = Object.assign(_TreeSelect, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _TreeSelect.name, _TreeSelect);
  },
}) as SFCWithInstall<typeof _TreeSelect>;

export type TreeSelectInstance = InstanceType<typeof _TreeSelect>;
export type TreeSelectLoadMore = NonNullable<TreeSelectProps['loadMore']>;

export default TreeSelect;
