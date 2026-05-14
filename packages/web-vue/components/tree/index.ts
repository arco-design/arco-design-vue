import type { App } from 'vue';

import type { SDOptions, SFCWithInstall } from '../_utils/types';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Tree from './tree.vue';

export type { TreeNodeData, TreeFieldNames } from './interface';

const Tree = Object.assign(_Tree, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Tree.name, _Tree);
  },
}) as SFCWithInstall<typeof _Tree>;

export type TreeInstance = InstanceType<typeof _Tree>;

export default Tree;
