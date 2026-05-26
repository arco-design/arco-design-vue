import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _QrCode from './qr-code.vue';

const QrCode = Object.assign(_QrCode, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _QrCode.name, _QrCode);
  },
});

export type QrCodeInstance = InstanceType<typeof _QrCode>;
export type {
  QrCodeErrorLevel,
  QrCodeIconSize,
  QrCodeInactiveStatus,
  QrCodeStatusProps,
  QrCodeStatusRenderInfo,
  QrCodeStatusType,
  QrCodeType,
  QrCodeValue,
} from './types';

export default QrCode;
