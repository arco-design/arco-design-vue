import type { CSSProperties } from 'vue';
import NP from 'number-precision';
import { Direction } from '../_utils/constant';

export const getOffsetPercent = (
  value: number,
  [min, max]: [number, number]
): string => {
  const percent = (value - min) / (max - min);
  return `${NP.round(percent * 100, 2)}%`;
};

export const getPositionStyle = (
  offset: string,
  direction: Direction
): CSSProperties => {
  return direction === 'vertical' ? { bottom: offset } : { left: offset };
};
