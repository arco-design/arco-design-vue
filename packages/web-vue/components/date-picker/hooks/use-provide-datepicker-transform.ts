import { toRefs, provide } from 'vue';
import { dayjs } from '../../_utils/date';
import { useI18n } from '../../locale';
import { BasePickerProps } from '../interface';
import { getValueByPath } from '../../_utils/get-value-by-path';
import { PickerContext, PickerInjectionKey } from '../context';

interface DatePickerTransform {
  locale?: BasePickerProps['locale'];
}

export default function useDatePickerTransform(props: DatePickerTransform) {
  const { locale } = toRefs(props);
  const { locale: i18nLocale, t } = useI18n();
  dayjs.locale(i18nLocale.value.toLowerCase());

  const datePickerT: typeof t = (key: string, ...args: any[]): any => {
    const keyForLocale = key.startsWith('datePicker.')
      ? key.split('.').slice(1).join('.')
      : key;

    return getValueByPath(locale?.value || {}, keyForLocale) || t(key, ...args);
  };

  provide<PickerContext>(PickerInjectionKey, {
    datePickerT,
  });

  return datePickerT;
}
