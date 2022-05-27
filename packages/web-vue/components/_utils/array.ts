export const union = <T>(target: T[], source: T[], difference = false): T[] => {
  return difference
    ? target.filter((item) => !source.includes(item))
    : Array.from(new Set(target.concat(source)));
};
