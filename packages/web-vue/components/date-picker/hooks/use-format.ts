import { computed, toRefs } from 'vue';
import { isFunction } from '../../_utils/is';
import { Mode, FormatFunc } from '../interface';

interface FormatProps {
  format: string | FormatFunc | undefined;
  mode?: Mode;
  showTime?: boolean;
}

export function getDefaultFormat(mode: Mode = 'date', showTime = false) {
  switch (mode) {
    case 'date':
      return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    case 'month':
      return 'YYYY-MM';
    case 'year':
      return 'YYYY';
    case 'week':
      return 'gggg-wo';
    case 'quarter':
      return 'YYYY-[Q]Q';
    default:
      return 'YYYY-MM-DD';
  }
}

export default function useFormat(props: FormatProps) {
  const { format: propFormat, mode, showTime } = toRefs(props);

  const format = computed(
    () =>
      (!isFunction(propFormat.value) && propFormat?.value) ||
      getDefaultFormat(mode?.value, showTime?.value)
  );

  return format;
}
