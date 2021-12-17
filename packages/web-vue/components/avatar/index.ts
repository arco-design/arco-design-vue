import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _Avatar from './avatar.vue';
import _AvatarGroup from './avatar-group';

const Avatar = Object.assign(_Avatar, {
  Group: _AvatarGroup,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Avatar.name, _Avatar);
    app.component(componentPrefix + _AvatarGroup.name, _AvatarGroup);
  },
});

export type AvatarInstance = InstanceType<typeof _Avatar>;
export type AvatarGroupInstance = InstanceType<typeof _AvatarGroup>;

export { _AvatarGroup as AvatarGroup };

export default Avatar;
