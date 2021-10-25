export const getTextBeforeSelection = (element: HTMLInputElement) => {
  const { value, selectionStart } = element;
  return value.slice(0, selectionStart);
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
