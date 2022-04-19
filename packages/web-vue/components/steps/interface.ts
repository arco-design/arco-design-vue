export const STEPS_TYPES = ['default', 'arrow', 'dot', 'navigation'] as const;
export type StepsType = typeof STEPS_TYPES[number];

export const STEP_STATUSES = ['wait', 'process', 'finish', 'error'] as const;
export type StepStatus = typeof STEP_STATUSES[number];

export interface StepData {
  step: number;
  status: StepStatus;
}
