import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _VerificationCode from './verification-code';

const VerificationCode = Object.assign(_VerificationCode, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _VerificationCode.name, _VerificationCode);
  },
});

export type VerificationCodeInstance = InstanceType<typeof _VerificationCode>;

export default VerificationCode;
