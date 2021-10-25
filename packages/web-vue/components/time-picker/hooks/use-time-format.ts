// 根据 format 和 use12Hours
// 1. 格式化 format 和 use12Hours
// 2. 带回要展示的时间列
// 3. 带回 am pm 的大小写格式

import { computed, toRefs } from 'vue';
import { getColumnsFromFormat } from '../utils';

interface FormatProps {
  format?: string;
  defaultFormat?: string;
  use12Hours?: boolean;
}

export default function useTimeFormat(props: FormatProps) {
  const {
    format: propFormat,
    use12Hours: propUse12Hours,
    defaultFormat,
  } = toRefs(props);

  const format = computed(() => {
    let res = propFormat?.value || defaultFormat?.value;
    if (!res || !getColumnsFromFormat(res).list.length) {
      res = propUse12Hours?.value ? 'hh:mm:ss a' : 'HH:mm:ss';
    }
    return res;
  });

  const configFromFormat = computed(() => getColumnsFromFormat(format.value));
  const list = computed(() => configFromFormat.value.list);
  const formatUse12Hours = computed(() => configFromFormat.value.use12Hours);

  const computedUse12Hours = computed(
    () => !!(propUse12Hours?.value || formatUse12Hours.value)
  );

  return {
    columns: list,
    use12Hours: computedUse12Hours,
    format,
  };
}
