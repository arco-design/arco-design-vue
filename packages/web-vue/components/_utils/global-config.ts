import type { App } from 'vue';
import { getCurrentInstance, inject } from 'vue';

import type { SDOptions } from './types';

import { configProviderInjectionKey } from '../config-provider/context';

const COMPONENT_PREFIX = 'Sd';
const CLASS_PREFIX = 'sd';
const GLOBAL_CONFIG_NAME = '$sd';

export const getComponentPrefix = (options?: SDOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX;
};

export const setGlobalConfig = (app: App, options?: SDOptions): void => {
  if (options?.classPrefix) {
    app.config.globalProperties[GLOBAL_CONFIG_NAME] = {
      ...app.config.globalProperties[GLOBAL_CONFIG_NAME],
      classPrefix: options.classPrefix,
    };
  }
};

export const getPrefixCls = (componentName?: string): string => {
  const instance = getCurrentInstance();
  const configProvider = inject(configProviderInjectionKey, undefined);

  const prefix =
    configProvider?.prefixCls ??
    instance?.appContext.config.globalProperties[GLOBAL_CONFIG_NAME]?.classPrefix ??
    CLASS_PREFIX;
  if (componentName) {
    return `${prefix}-${componentName}`;
  }
  return prefix;
};

type CssVarToken<T extends string> = T extends `--${infer Rest}`
  ? `--${typeof CLASS_PREFIX}-${Rest}`
  : `--${typeof CLASS_PREFIX}-${T}`;

/**
 * 生成带组件库前缀的 CSS 变量名
 * @example getCssVarToken('--color-text-2') // type: '--sd-color-text-2'
 * @example getCssVarToken('color-text-2')   // type: '--sd-color-text-2'
 */
export const getCssVarToken = <T extends string>(token: T): CssVarToken<T> => {
  const name = (token as string).replace(/^--/, '');
  return `--${CLASS_PREFIX}-${name}` as CssVarToken<T>;
};
