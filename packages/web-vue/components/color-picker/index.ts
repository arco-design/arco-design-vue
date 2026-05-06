import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _ColorPicker from './color-picker';

const ColorPicker = Object.assign(_ColorPicker, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _ColorPicker.name, _ColorPicker);
  },
});

export type {
  RGB,
  HSV,
  HSVA,
  Color,
  ColorMode,
  ColorModes,
  ColorFormat,
  ColorObject,
  ColorValueState,
  ColorPickerChangeTrigger,
  GradientColorPoint,
  RecentColorsValue,
} from './interface';
export type ColorPickerInstance = InstanceType<typeof _ColorPicker>;

export default ColorPicker;
