import { toRefs, ref, watchEffect, computed } from 'vue';
import { TreeNodeKey, Key2TreeNode } from '../interface';
import { getCheckedStateByInitKeys } from '../utils/check-utils';

export default function useCheckedState(props: {
  defaultCheckedKeys: TreeNodeKey[] | undefined;
  checkedKeys: TreeNodeKey[] | undefined;
  halfCheckedKeys: TreeNodeKey[] | undefined;
  key2TreeNode: Key2TreeNode;
  checkStrictly: boolean;
  onlyCheckLeaf: boolean;
}) {
  const {
    defaultCheckedKeys,
    checkedKeys: propCheckedKeys,
    key2TreeNode,
    checkStrictly,
    halfCheckedKeys,
    onlyCheckLeaf,
  } = toRefs(props);

  const isInitialized = ref(false);
  const localCheckedKeys = ref<TreeNodeKey[]>([]);
  const localIndeterminateKeys = ref<TreeNodeKey[]>([]);
  const computedCheckedKeys = ref<TreeNodeKey[]>();
  const computedIndeterminateKeys = ref<TreeNodeKey[]>();

  const getStateByKeys = (keys: TreeNodeKey[]) => {
    return getCheckedStateByInitKeys({
      initCheckedKeys: keys,
      key2TreeNode: key2TreeNode.value,
      checkStrictly: checkStrictly.value,
      onlyCheckLeaf: onlyCheckLeaf.value,
    });
  };

  const init = (keys: TreeNodeKey[]) => {
    const initState = getStateByKeys(keys);
    [localCheckedKeys.value, localIndeterminateKeys.value] = initState;
  };

  init(propCheckedKeys.value || defaultCheckedKeys?.value || []);

  watchEffect(() => {
    if (propCheckedKeys.value) {
      [computedCheckedKeys.value, computedIndeterminateKeys.value] =
        getStateByKeys(propCheckedKeys.value);
    } else if (isInitialized.value) {
      computedCheckedKeys.value = undefined;
      computedIndeterminateKeys.value = undefined;
      localCheckedKeys.value = [];
      localIndeterminateKeys.value = [];
    }
    if (!isInitialized.value) {
      isInitialized.value = true;
    }
  });

  return {
    checkedKeys: computed(
      () => computedCheckedKeys.value || localCheckedKeys.value
    ),
    indeterminateKeys: computed(() => {
      if (checkStrictly.value && halfCheckedKeys.value) {
        return halfCheckedKeys.value;
      }
      return computedIndeterminateKeys.value || localIndeterminateKeys.value;
    }),
    setCheckedState(
      newCheckedKeys: TreeNodeKey[],
      newIndeterminateKeys: TreeNodeKey[],
      reinitialize = false
    ) {
      if (reinitialize) {
        init(newCheckedKeys);
      } else {
        localCheckedKeys.value = newCheckedKeys;
        localIndeterminateKeys.value = newIndeterminateKeys;
      }
      return [localCheckedKeys.value, localIndeterminateKeys.value];
    },
  };
}
