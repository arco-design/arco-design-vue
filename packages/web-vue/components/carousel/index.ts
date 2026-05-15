import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Carousel from './carousel';
import _CarouselItem from './carousel-item.vue';

export type {
  CarouselArrowType,
  CarouselAutoPlayConfig,
  CarouselIndicatorPosition,
  CarouselIndicatorType,
  CarouselTriggerEvent,
} from './interface';

const Carousel = Object.assign(_Carousel, {
  Item: _CarouselItem,
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Carousel.name, _Carousel);
    app.component(componentPrefix + _CarouselItem.name, _CarouselItem);
  },
});

export type CarouselInstance = InstanceType<typeof _Carousel>;
export type CarouselItemInstance = InstanceType<typeof _CarouselItem>;

export { _CarouselItem as CarouselItem };

export default Carousel;
