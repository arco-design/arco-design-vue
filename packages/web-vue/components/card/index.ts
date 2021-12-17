import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Card from './card';
import _CardMeta from './card-meta';
import _CardGrid from './card-grid.vue';

const Card = Object.assign(_Card, {
  Meta: _CardMeta,
  Grid: _CardGrid,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Card.name, _Card);
    app.component(componentPrefix + _CardMeta.name, _CardMeta);
    app.component(componentPrefix + _CardGrid.name, _CardGrid);
  },
});

export type CardInstance = InstanceType<typeof _Card>;
export type CardMetaInstance = InstanceType<typeof _CardMeta>;
export type CardGridInstance = InstanceType<typeof _CardGrid>;

export { _CardMeta as CardMeta, _CardGrid as CardGrid };

export default Card;
