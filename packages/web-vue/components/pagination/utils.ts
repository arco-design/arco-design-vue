export const getLegalPage = (
  page: number,
  { min, max }: { min: number; max: number }
): number => {
  if (page < min) {
    return min;
  }
  if (page > max) {
    return max;
  }
  return page;
};
