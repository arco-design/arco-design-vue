import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Badge from './badge';

const Badge = Object.assign(_Badge, {
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Badge.name, _Badge);
  },
});

export type BadgeInstance = InstanceType<typeof _Badge>;

export default Badge;
