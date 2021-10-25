export const SHAPES = ['circle', 'square'] as const;
export type ShapeType = typeof SHAPES[number];

export const TRIGGER_TYPES = ['mask', 'button'] as const;
export type TriggerType = typeof TRIGGER_TYPES[number];
