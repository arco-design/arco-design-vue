export const union = <T>(target: T[], source: T[], difference = false): T[] => {
  return difference
    ? target.filter((item) => !source.includes(item))
    : Array.from(new Set(target.concat(source)));
};

export const getReverse = <T>(array: T[]): T[] => {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = array[array.length - 1 - i];
  }
  return result;
};
