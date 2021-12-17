import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Statistic from './statistic.vue';
import _Countdown from './countdown.vue';

const Statistic = Object.assign(_Statistic, {
  Countdown: _Countdown,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Statistic.name, _Statistic);
    app.component(componentPrefix + _Countdown.name, _Countdown);
  },
});

export type StatisticInstance = InstanceType<typeof _Statistic>;
export type CountdownInstance = InstanceType<typeof _Countdown>;

export { _Countdown as Countdown };

export default Statistic;
