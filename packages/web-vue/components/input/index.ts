import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Input from './input';
import _InputSearch from './input-search';
import _InputPassword from './input-password.vue';
import _InputGroup from './input-group.vue';

const Input = Object.assign(_Input, {
  Search: _InputSearch,
  Password: _InputPassword,
  Group: _InputGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Input.name, _Input);
    app.component(componentPrefix + _InputGroup.name, _InputGroup);
    app.component(componentPrefix + _InputSearch.name, _InputSearch);
    app.component(componentPrefix + _InputPassword.name, _InputPassword);
  },
});

export type InputInstance = InstanceType<typeof _Input>;
export type InputSearchInstance = InstanceType<typeof _InputSearch>;
export type InputPasswordInstance = InstanceType<typeof _InputPassword>;
export type InputGroupInstance = InstanceType<typeof _InputGroup>;

export {
  _InputSearch as InputSearch,
  _InputPassword as InputPassword,
  _InputGroup as InputGroup,
};

export default Input;
