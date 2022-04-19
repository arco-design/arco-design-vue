import { computed, Ref } from 'vue';
import { isNumber, isObject } from '../../_utils/is';
import { responsiveArray } from '../../_utils/responsive-observe';
import { ResponsiveValue } from '../interface';

export function useResponsiveValue(
  props: Ref<{
    val: number;
    key: string;
    xs?: number | { [key: string]: any };
    sm?: number | { [key: string]: any };
    md?: number | { [key: string]: any };
    lg?: number | { [key: string]: any };
    xl?: number | { [key: string]: any };
    xxl?: number | { [key: string]: any };
  }>
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
      } else if (isObject(config) && isNumber(config[key])) {
        result[breakpoint] = config[key];
      }
    });
    return result;
  });
  return value;
}
