import type { App } from 'vue';
import type { ArcoOptions, SFCWithInstall } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Form from './form.vue';
import _FormItem from './form-item.vue';

// 显式标注：推断类型会引用 .pnpm 内部路径，生成的 .d.ts 不可移植
const Form: SFCWithInstall<typeof _Form, { Item: typeof _FormItem }> =
  Object.assign(_Form, {
    Item: _FormItem,
    install: (app: App, options?: ArcoOptions) => {
      setGlobalConfig(app, options);
      const componentPrefix = getComponentPrefix(options);

      app.component(componentPrefix + _Form.name, _Form);
      app.component(componentPrefix + _FormItem.name, _FormItem);
    },
  });

export type FormInstance = InstanceType<typeof _Form>;
export type FormItemInstance = InstanceType<typeof _FormItem>;
export type {
  ValidateStatus,
  ValidateTrigger,
  ValidatedError,
  FieldRule,
  FormItemEventHandler,
} from './interface';

export { _FormItem as FormItem };

export default Form;
