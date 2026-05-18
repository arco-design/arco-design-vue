import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _TagGroup from './tag-group.vue';

const TagGroup = Object.assign(_TagGroup, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _TagGroup.name, _TagGroup);
  },
});

export type TagGroupInstance = InstanceType<typeof _TagGroup>;
export type {
  TagGroupFieldNames,
  TagGroupObjectOption,
  TagGroupOption,
  TagGroupOptionLabel,
  TagGroupProps,
} from './interface';

export default TagGroup;
