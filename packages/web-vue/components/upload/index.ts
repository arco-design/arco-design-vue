import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Upload from './upload';

const Upload = Object.assign(_Upload, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Upload.name, _Upload);
  },
});

export type UploadInstance = InstanceType<typeof _Upload>;

export type {
  FileStatus,
  FileItem,
  CustomIcon,
  RequestOption,
  UploadRequest,
} from './interfaces';

export default Upload;
