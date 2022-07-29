import { InjectionKey } from 'vue';
import { Direction } from '../_utils/constant';
import type { ModeType, LabelPositionType } from './interface';

export interface TimelineContext {
  items: number[];
  direction: Direction;
  reverse: boolean;
  labelPosition: LabelPositionType;
  mode: ModeType;
}

export const timelineInjectionKey: InjectionKey<TimelineContext> =
  Symbol('ArcoTimeline');
