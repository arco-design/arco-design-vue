import { App } from 'vue';
import { ArcoOptions } from '../_utils/types';
import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Image from './image.vue';
import _ImagePreview from './preview.vue';
import _ImagePreviewGroup from './preview-group.vue';

const Image = Object.assign(_Image, {
  Preview: _ImagePreview,
  PreviewGroup: _ImagePreviewGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Image.name, _Image);
    app.component(componentPrefix + _ImagePreview.name, _ImagePreview);
    app.component(
      componentPrefix + _ImagePreviewGroup.name,
      _ImagePreviewGroup
    );
  },
});

export type ImageInstance = InstanceType<typeof _Image>;
export type ImagePreviewInstance = InstanceType<typeof _ImagePreview>;
export type ImagePreviewGroupInstance = InstanceType<typeof _ImagePreviewGroup>;

export default Image;
