import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _TimelineItem from './item.vue';
import _Timeline from './timeline';

export type { DotType, LabelPositionType, LineType, ModeType, PositionType } from './interface';

const Timeline = Object.assign(_Timeline, {
  Item: _TimelineItem,
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Timeline.name, _Timeline);
    app.component(componentPrefix + _TimelineItem.name, _TimelineItem);
  },
});

export type TimelineInstance = InstanceType<typeof _Timeline>;
export type TimelineItemInstance = InstanceType<typeof _TimelineItem>;

export { _TimelineItem as TimelineItem };

export default Timeline;
