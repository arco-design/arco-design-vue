export const getTextBeforeSelection = (element: HTMLInputElement) => {
  const { value, selectionStart } = element;
  // selectionStart 在未聚焦时为 null，slice(0, null) 等价于 slice(0, 0)
  return value.slice(0, selectionStart ?? 0);
};

export const getLastMeasureIndex = (
  text: string,
  prefix: string | string[]
) => {
  const _prefix = ([] as string[]).concat(prefix);
  return _prefix.reduce(
    (pre, value) => {
      const lastIndex = text.lastIndexOf(value);
      if (lastIndex > pre.location) {
        return {
          location: lastIndex,
          prefix: value,
        };
      }
      return pre;
    },
    {
      location: -1,
      prefix: '',
    }
  );
};

export const isValidSearch = (text: string, split: string) => {
  return !split || !text.includes(split);
};
