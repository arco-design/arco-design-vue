import type { App } from 'vue';
import type { ArcoOptions, SFCWithInstall } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _TimePicker from './time-picker.vue';

// 显式标注：推断类型会引用 dayjs / @vue/shared 的内部路径，生成的 .d.ts 不可移植
// 注意要显式传第二个泛型 {}：默认值 Record<string, never> 会与组件 props 冲突
const TimePicker: SFCWithInstall<typeof _TimePicker> = Object.assign(
  _TimePicker,
  {
    install: (app: App, options?: ArcoOptions) => {
      setGlobalConfig(app, options);
      const componentPrefix = getComponentPrefix(options);

      app.component(componentPrefix + _TimePicker.name, _TimePicker);
    },
  }
);

export type TimePickerInstance = InstanceType<typeof _TimePicker>;

export default TimePicker;
