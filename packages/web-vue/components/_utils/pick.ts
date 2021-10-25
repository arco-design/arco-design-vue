// pick item from object
export default function pick<
  T extends Record<string, unknown>,
  K extends keyof T
>(obj: T, keys: Array<K | string>): Pick<T, K> {
  const clone = {} as Pick<T, K>;
  keys.forEach((key) => {
    const k = key as K;
    // @ts-ignore
    if (key in obj) {
      clone[k] = obj[k];
    }
  });
  return clone;
}
