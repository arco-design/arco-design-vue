import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _CascaderPanel from './cascader-panel.vue';
import _Cascader from './cascader.vue';

const Cascader = Object.assign(_Cascader, {
  CascaderPanel: _CascaderPanel,
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Cascader.name, _Cascader);
    app.component(componentPrefix + _CascaderPanel.name, _CascaderPanel);
  },
});

export type CascaderInstance = InstanceType<typeof _Cascader>;
export type CascaderPanelInstance = InstanceType<typeof _CascaderPanel>;
export type {
  CascaderChangeHandler,
  CascaderFallback,
  CascaderFieldNames,
  CascaderFormatLabel,
  CascaderLoadMore,
  CascaderModelValue,
  CascaderOption,
  CascaderOptionValue,
  CascaderPathValue,
  CascaderSearchHandler,
  CascaderSingleValue,
} from './interface';

export { _CascaderPanel as CascaderPanel };
export default Cascader;
