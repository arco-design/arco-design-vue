export const ANIMATIONS = ['slide', 'fade'] as const;
export type AnimationType = typeof ANIMATIONS[number];

export const TRIGGERS = ['click', 'hover'] as const;
export type TriggerType = typeof TRIGGERS[number];

export const DIRECTIONS = ['horizontal', 'vertical'] as const;
export type DirectionType = typeof DIRECTIONS[number];

export const ARROWS = ['always', 'hover', 'never'] as const;
export type ArrowType = typeof ARROWS[number];

export const INDICATORS = ['line', 'dot', 'slider', 'never'] as const;
export type IndicatorType = typeof INDICATORS[number];

export const INDICATORS_POSITION = [
  'bottom',
  'top',
  'left',
  'right',
  'outer',
] as const;
export type IndicatorPositionType = typeof INDICATORS_POSITION[number];
