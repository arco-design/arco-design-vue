import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Tour from './tour.vue';

const Tour = Object.assign(_Tour, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Tour.name, _Tour);
  },
});

export type TourInstance = InstanceType<typeof _Tour>;
export type {
  TourAlignment,
  TourAllowedButton,
  TourController,
  TourConfig,
  TourExpose,
  TourPopover,
  TourProps,
  TourSide,
  TourState,
  TourStep,
} from './types';

export default Tour;
