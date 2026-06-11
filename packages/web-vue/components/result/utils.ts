export const RESULT_STATUS = [
  'info',
  'success',
  'warning',
  'error',
  '403',
  '404',
  '500',
  null,
] as const;
export type ResultStatus = (typeof RESULT_STATUS)[number];
