export const DIRECTIONS = ['horizontal', 'vertical'] as const;
export type DirectionType = typeof DIRECTIONS[number];

export const MODES = ['left', 'right', 'top', 'bottom', 'alternate'] as const;
export type ModeType = typeof MODES[number];

export const LABEL_POSITIONS = ['relative', 'same'] as const;
export type LabelPositionType = typeof LABEL_POSITIONS[number];

export const DOTS = ['hollow', 'solid'] as const;
export type DotType = typeof DOTS[number];

export const LINES = ['solid', 'dashed', 'dotted'] as const;
export type LineType = typeof LINES[number];

export const POSITIONS = ['left', 'right', 'top', 'bottom'] as const;
export type PositionType = typeof POSITIONS[number];
