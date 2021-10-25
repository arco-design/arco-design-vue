import { InjectionKey } from 'vue';
import { ModeType, DirectionType, LabelPositionType } from './constants';

export type VItem = { uid: number };

export interface TimelineContext {
  addItem: (item: VItem) => void;
  removeItem: (uid: number) => void;
  direction: DirectionType;
  items: VItem[];
  reverse: boolean;
  labelPosition: LabelPositionType;
  mode: ModeType;
}

export const timelineInjectionKey: InjectionKey<TimelineContext> =
  Symbol('ArcoTimeline');
