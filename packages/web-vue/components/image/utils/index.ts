import { isNumber, isUndefined } from '../../_utils/is';

export function normalizeImageSizeProp(size?: string | number) {
  if (isUndefined(size)) return undefined;
  if (!isNumber(size) && /^\d+(%)$/.test(size)) return size;

  const num = parseInt(size as string, 10);

  return isNumber(num) ? `${num}px` : undefined;
}
