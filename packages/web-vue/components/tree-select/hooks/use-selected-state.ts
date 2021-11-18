import { computed, ref, toRefs, watchEffect, watch } from 'vue';
import { isArray, isObject, isUndefined } from '../../_utils/is';
import { LabelValue } from '../interface';
import { Key2TreeNode } from '../../tree/utils';
import { TreeNodeKey } from '../../tree/interface';

type Value =
  | TreeNodeKey
  | LabelValue
  | (TreeNodeKey | LabelValue)[]
  | undefined;

export default function useSelectedState(props: {
  defaultValue: Value;
  modelValue: Value;
  key2TreeNode: Key2TreeNode;
  multiple?: boolean;
  treeCheckable?: boolean;
  treeCheckStrictly?: boolean;
}) {
  const { defaultValue, modelValue, key2TreeNode, multiple, treeCheckable } =
    toRefs(props);

  function normalizeValue(value: Value) {
    if (isUndefined(value)) return undefined;
    if (multiple?.value || treeCheckable?.value)
      return !isArray(value) ? [value] : value;
    return isArray(value) ? value.slice(0, 1) : [value];
  }

  function getKeys(value?: (TreeNodeKey | LabelValue)[]) {
    if (!value) return undefined;

    const keys = value
      .map((item) => (isObject(item) ? item.value : item))
      .filter((item) => !isUndefined(item)) as TreeNodeKey[];

    return keys;
  }

  function getLabelValues(
    value: (TreeNodeKey | LabelValue)[],
    originValue?: LabelValue[]
  ) {
    if (!value) {
      return undefined;
    }

    const originValueMap = new Map<TreeNodeKey, LabelValue>();
    originValue?.forEach((item) => {
      originValueMap.set(item.value, item);
    });

    value = value.filter((item) => !isUndefined(item));
    if (!value.length) {
      return undefined;
    }

    return value.map((item) => {
      let res: LabelValue = isObject(item)
        ? { ...item }
        : ({ value: item, label: undefined } as unknown as LabelValue);

      const node = key2TreeNode.value[res.value];
      res.label = res.label ?? node?.title ?? res.value;

      if (originValueMap && originValueMap.has(res.value)) {
        res = {
          ...res,
          ...originValueMap.get(res.value),
        };
      }

      res.label = res.label ?? res.value;

      return res;
    });
  }

  const computedModelValueKeys = ref<TreeNodeKey[]>();
  const computedModelValue = ref<LabelValue[]>();
  watchEffect(() => {
    const normalizeModelValue = normalizeValue(modelValue.value);
    const modelValueKeys = getKeys(normalizeModelValue);
    computedModelValueKeys.value = modelValueKeys;
    computedModelValue.value =
      normalizeModelValue &&
      modelValueKeys &&
      getLabelValues(modelValueKeys, getLabelValues(normalizeModelValue));
  });

  const normalizeDefaultValue = normalizeValue(defaultValue.value);
  const defaultKeys = getKeys(normalizeDefaultValue);
  const defaultLabelValues = getLabelValues(
    defaultKeys || [],
    getLabelValues(normalizeDefaultValue || [])
  );
  const localValueKeys = ref(defaultKeys || []);
  const localValue = ref(defaultLabelValues);
  watch(localValueKeys, () => {
    localValue.value = getLabelValues(localValueKeys.value, defaultLabelValues);
  });
  watch([computedModelValueKeys, computedModelValue], ([valueKeys, value]) => {
    // @ts-ignore
    localValueKeys.value = valueKeys;
    localValue.value = value;
  });

  const selectedKeys = computed(
    () => computedModelValueKeys.value || localValueKeys.value
  );
  const selectedValue = computed(
    () => computedModelValue.value || localValue.value
  );

  return {
    selectedKeys,
    selectedValue,
    setLocalSelectedKeys(keys: TreeNodeKey[]) {
      localValueKeys.value = keys;
    },
  };
}
