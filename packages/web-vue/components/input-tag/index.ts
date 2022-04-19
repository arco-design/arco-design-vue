import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _InputTag from './input-tag';

const InputTag = Object.assign(_InputTag, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _InputTag.name, _InputTag);
  },
});

export type InputTagInstance = InstanceType<typeof _InputTag>;
export type { TagData, InputTagFieldNames } from './interface';

export default InputTag;
