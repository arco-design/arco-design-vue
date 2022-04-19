import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Button from './button.vue';
import _ButtonGroup from './button-group.vue';

const Button = Object.assign(_Button, {
  Group: _ButtonGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Button.name, _Button);
    app.component(componentPrefix + _ButtonGroup.name, _ButtonGroup);
  },
});

export type ButtonInstance = InstanceType<typeof _Button>;
export type ButtonGroupInstance = InstanceType<typeof _ButtonGroup>;
export type { ButtonProps } from './interface';

export { _ButtonGroup as ButtonGroup };

export default Button;
