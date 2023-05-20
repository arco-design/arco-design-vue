import { computed, toRefs } from 'vue';
import { isFunction } from '../../_utils/is';
import { Mode, FormatFunc, ValueFormat } from '../interface';

interface FormatProps {
  format?: string | FormatFunc;
  valueFormat?: ValueFormat;
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

export function getDefaultValueFormat(mode: Mode = 'date', showTime = false) {
  switch (mode) {
    case 'date':
      return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    case 'month':
      return 'YYYY-MM';
    case 'year':
      return 'YYYY';
    case 'week':
      return 'YYYY-MM-DD';
    case 'quarter':
      return 'YYYY-MM';
    default:
      return 'YYYY-MM-DD';
  }
}

export default function useFormat(props: FormatProps) {
  const {
    format: propFormat,
    mode,
    showTime,
    valueFormat: propValueFormat,
  } = toRefs(props);

  const format = computed(
    () =>
      (!isFunction(propFormat?.value) && propFormat?.value) ||
      getDefaultFormat(mode?.value, showTime?.value)
  );

  const valueFormat = computed(
    () =>
      propValueFormat?.value ||
      getDefaultValueFormat(mode?.value, showTime?.value)
  );

  const parseValueFormat = computed(() =>
    ['timestamp', 'Date'].includes(valueFormat.value)
      ? format.value
      : valueFormat.value
  );

  return {
    format,
    valueFormat,
    parseValueFormat,
  };
}
