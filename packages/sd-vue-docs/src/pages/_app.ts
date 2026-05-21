import type { App } from 'vue';

import SDVue from '@sdata/web-vue';
import SDVueIcon from '@sdata/web-vue/es/icon.js';
import 'overlayscrollbars/overlayscrollbars.css';

import '../styles/sd-vue.scss';

export default (app: App) => {
  app.use(SDVue);
  app.use(SDVueIcon);
};
