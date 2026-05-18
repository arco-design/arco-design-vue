import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Cropper from './cropper.vue';

const Cropper = Object.assign(_Cropper, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Cropper.name, _Cropper);
  },
});

export type CropperInstance = InstanceType<typeof _Cropper>;
export type {
  CropperCanvasProps,
  CropperExpose,
  CropperImageProps,
  CropperImageTransformDetail,
  CropperProps,
  CropperSelectionChangeDetail,
  CropperSelectionProps,
} from './interface';

export default Cropper;
