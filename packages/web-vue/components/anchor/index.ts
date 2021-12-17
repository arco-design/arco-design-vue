import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Anchor from './anchor.vue';
import _AnchorLink from './anchor-link.vue';

const Anchor = Object.assign(_Anchor, {
  Link: _AnchorLink,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Anchor.name, _Anchor);
    app.component(componentPrefix + _AnchorLink.name, _AnchorLink);
  },
});

export type AnchorInstance = InstanceType<typeof _Anchor>;
export type AnchorLinkInstance = InstanceType<typeof _AnchorLink>;

export { _AnchorLink as AnchorLink };

export default Anchor;
