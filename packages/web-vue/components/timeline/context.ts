import { InjectionKey } from 'vue';
import { Direction } from '../_utils/constant';
import type { ModeType, LabelPositionType } from './interface';

export type VItem = { uid: number };

export interface TimelineContext {
  addItem: (item: VItem) => void;
  removeItem: (uid: number) => void;
  direction: Direction;
  items: VItem[];
  reverse: boolean;
  labelPosition: LabelPositionType;
  mode: ModeType;
}

export const timelineInjectionKey: InjectionKey<TimelineContext> =
  Symbol('ArcoTimeline');
