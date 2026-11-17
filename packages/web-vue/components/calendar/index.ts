import type { App } from 'vue';
import type { ArcoOptions, SFCWithInstall } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Calendar from './calendar';

// 显式标注：推断类型会引用 dayjs / @vue/shared 的内部路径，生成的 .d.ts 不可移植
// 注意要显式传第二个泛型 {}：默认值 Record<string, never> 会与组件 props 冲突
const Calendar: SFCWithInstall<typeof _Calendar> = Object.assign(_Calendar, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Calendar.name, _Calendar);
  },
});

export type CalendarInstance = InstanceType<typeof _Calendar>;

export default Calendar;
