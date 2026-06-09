import { computed, Ref } from 'vue';

import type { ColResponsiveConfig, ResponsiveValue } from '../interface';

import { isNumber, isObject } from '../../_utils/is';
import { responsiveArray } from '../../_utils/responsive-observe';

export function useResponsiveValue(
  props: Ref<{
    val: number;
    key: string;
    xs?: number | ColResponsiveConfig;
    sm?: number | ColResponsiveConfig;
    md?: number | ColResponsiveConfig;
    lg?: number | ColResponsiveConfig;
    xl?: number | ColResponsiveConfig;
    xxl?: number | ColResponsiveConfig;
  }>,
) {
  const value = computed(() => {
    const { val, key, xs, sm, md, lg, xl, xxl } = props.value;
    if (!xs && !sm && !md && !lg && !xl && !xxl) {
      return val;
    }
    const result: ResponsiveValue = {};
    responsiveArray.forEach((breakpoint) => {
      const config = props.value[breakpoint];
      if (isNumber(config)) {
        result[breakpoint] = config;
      } else if (isObject(config) && isNumber((config as Record<string, any>)[key])) {
        result[breakpoint] = (config as Record<string, any>)[key];
      }
    });
    return result;
  });
  return value;
}
