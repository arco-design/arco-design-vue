import { computed, ref, toRefs, watchEffect, watch } from 'vue';
import { isArray, isFunction, isObject } from '../../_utils/is';
import { FallbackOption, LabelValue, TreeSelectValue } from '../interface';
import {
  Key2TreeNode,
  TreeFieldNames,
  TreeNodeData,
  TreeNodeKey,
} from '../../tree/interface';

function isLabelValue(value: TreeNodeKey | LabelValue): value is LabelValue {
  return isObject(value);
}

function isValidKey(key: TreeNodeKey) {
  return key !== undefined && key !== null && key !== '';
}

function getKey(value: TreeNodeKey | LabelValue) {
  return isLabelValue(value) ? value.value : value;
}

function getLabel(value: TreeNodeKey | LabelValue) {
  return isLabelValue(value) ? value.label : undefined;
}

function isValidValue(value: TreeNodeKey | LabelValue) {
  const key = getKey(value);
  return isValidKey(key);
}

function getKeys(value: (TreeNodeKey | LabelValue)[]) {
  return value.map(getKey).filter(isValidKey);
}

export default function useSelectedState(props: {
  defaultValue?: TreeSelectValue;
  modelValue?: TreeSelectValue;
  key2TreeNode: Key2TreeNode;
  multiple?: boolean;
  treeCheckable?: boolean;
  treeCheckStrictly?: boolean;
  fallbackOption?: FallbackOption;
  fieldNames?: TreeFieldNames;
}) {
  const {
    defaultValue,
    modelValue,
    key2TreeNode,
    multiple,
    treeCheckable,
    fallbackOption,
    fieldNames,
  } = toRefs(props);

  function normalizeValue(value: TreeSelectValue) {
    const validValue = (isArray(value) ? value : [value]).filter(isValidValue);

    return multiple?.value || treeCheckable?.value
      ? validValue
      : validValue.slice(0, 1);
  }

  function getLabelValues(
    value: (TreeNodeKey | LabelValue)[],
    originValue?: LabelValue[]
  ) {
    const res: LabelValue[] = [];
    const validValue = value ? value.filter(isValidValue) : [];

    if (validValue.length) {
      const originValueMap = new Map<TreeNodeKey, LabelValue>();
      originValue?.forEach((item) => {
        originValueMap.set(item.value, item);
      });

      validValue.forEach((item) => {
        const key = getKey(item);
        const originValueItem = originValueMap.get(key);
        const node = key2TreeNode.value.get(key);
        let fallbackNodeData: TreeNodeData | null = null;
        const nodeDataTitle = (fieldNames?.value?.title || 'title') as 'title';

        if (!node) {
          const fallbackResult = isFunction(fallbackOption?.value)
            ? fallbackOption?.value(key)
            : fallbackOption?.value;

          if (fallbackResult === false) {
            return;
          }

          if (isObject(fallbackResult)) {
            fallbackNodeData = fallbackResult;
          }
        }

        res.push({
          ...(isLabelValue(item) ? item : {}),
          ...(originValueItem || {}),
          value: key,
          label:
            getLabel(item) ??
            node?.title ??
            originValueItem?.label ??
            fallbackNodeData?.[nodeDataTitle] ??
            key,
        });
      });
    }

    return res;
  }

  const computedModelValueKeys = ref<TreeNodeKey[]>();
  const computedModelValue = ref<LabelValue[]>();
  watchEffect(() => {
    const isControlled = modelValue?.value !== undefined;
    const normalizeModelValue = normalizeValue(modelValue?.value ?? []);
    const modelValueKeys = getKeys(normalizeModelValue);
    computedModelValue.value = isControlled
      ? getLabelValues(modelValueKeys, getLabelValues(normalizeModelValue))
      : undefined;
    computedModelValueKeys.value = isControlled ? modelValueKeys : undefined;
  });

  const normalizeDefaultValue = normalizeValue(defaultValue?.value ?? []);
  const defaultKeys = getKeys(normalizeDefaultValue);
  const defaultLabelValues = getLabelValues(
    defaultKeys,
    getLabelValues(normalizeDefaultValue)
  );
  const localValueKeys = ref(defaultKeys || []);
  const localValue = ref(defaultLabelValues);
  watch(localValueKeys, () => {
    localValue.value = getLabelValues(localValueKeys.value, defaultLabelValues);
  });
  watch([computedModelValueKeys, computedModelValue], ([valueKeys, value]) => {
    localValueKeys.value = valueKeys || [];
    localValue.value = value || [];
  });

  const selectedKeys = computed(
    () => computedModelValueKeys.value ?? localValueKeys.value
  );
  const selectedValue = computed(
    () => computedModelValue.value ?? localValue.value
  );

  return {
    selectedKeys,
    selectedValue,
    setLocalSelectedKeys(keys: TreeNodeKey[]) {
      localValueKeys.value = keys;
    },
    localSelectedKeys: localValueKeys,
    localSelectedValue: localValue,
  };
}
