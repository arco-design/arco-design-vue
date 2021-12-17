import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Checkbox from './checkbox.vue';
import _CheckboxGroup from './checkbox-group.vue';

const Checkbox = Object.assign(_Checkbox, {
  Group: _CheckboxGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Checkbox.name, _Checkbox);
    app.component(componentPrefix + _CheckboxGroup.name, _CheckboxGroup);
  },
});

export type CheckboxInstance = InstanceType<typeof _Checkbox>;
export type CheckboxGroupInstance = InstanceType<typeof _CheckboxGroup>;

export { _CheckboxGroup as CheckboxGroup };

export default Checkbox;
