import { ref, reactive, inject, computed } from 'vue';

import type { SDI18nMessages, SDLang } from './interface';

import { isString } from '../_utils/is';
import { configProviderInjectionKey } from '../config-provider/context';
import zhCN from './lang/zh-cn';

const LOCALE = ref('zh-CN');
const I18N_MESSAGES = reactive<SDI18nMessages>({
  'zh-CN': zhCN,
});

/**
 * 添加地区语言包。添加过后的语言包可以通过 `useLocale` 使用
 * @param messages 需要添加的地区语言数据
 * @param options
 */
export const addI18nMessages = (
  messages: SDI18nMessages,
  options?: {
    overwrite?: boolean;
  },
) => {
  for (const key of Object.keys(messages)) {
    if (!I18N_MESSAGES[key] || options?.overwrite) {
      I18N_MESSAGES[key] = messages[key];
    }
  }
};

/**
 * 切换地区语言。仅在未提供ConfigProvider时生效。
 * @param locale
 */
export const useLocale = (locale: string) => {
  if (!I18N_MESSAGES[locale]) {
    // oxlint-disable-next-line no-console
    console.warn(`use ${locale} failed! Please add ${locale} first`);
    return;
  }
  LOCALE.value = locale;
};

/**
 * 获取当前的地区语言
 */
export const getLocale = () => {
  return LOCALE.value;
};

// 仅内部使用
export const useI18n = () => {
  const configProvider = inject(configProviderInjectionKey, undefined);
  const i18nMessage = computed<SDLang>(() => configProvider?.locale ?? I18N_MESSAGES[LOCALE.value]);
  const locale = computed(() => i18nMessage.value.locale);

  const transform = (key: string, ...args: unknown[]): string => {
    const keyArray = key.split('.');
    let temp: Record<string, any> = i18nMessage.value as unknown as Record<string, any>;

    for (const keyItem of keyArray) {
      if (!temp[keyItem]) {
        return key;
      }
      temp = temp[keyItem];
    }
    if (isString(temp)) {
      if (args.length > 0) {
        return (temp as string).replace(/{(\d+)}/g, (sub, index) => String(args[index] ?? sub));
      }

      return temp as string;
    }
    return temp as unknown as string;
  };

  return {
    i18nMessage,
    locale,
    t: transform,
  };
};
