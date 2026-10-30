import { ref, Ref, toRef, watch } from 'vue';
import { isEqual } from '../_utils/is-equal';

// 显式标注返回类型，否则 dtsgen 推断出的类型会引用 @vue/shared 的内部路径（TS2742）
export const usePureProp = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  props: T,
  name: K
): Ref<T[K]> => {
  const _value = toRef(props, name);
  const value = ref(_value.value) as Ref<T[K]>;
  watch(_value, (cur, pre) => {
    if (!isEqual(cur, pre)) {
      value.value = cur as T[K];
    }
  });
  return value;
};
