import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Tag from './tag.vue';

const Tag = Object.assign(_Tag, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Tag.name, _Tag);
  },
});

export type TagInstance = InstanceType<typeof _Tag>;
export type { TagProps, TagColor } from './interface';

export default Tag;
