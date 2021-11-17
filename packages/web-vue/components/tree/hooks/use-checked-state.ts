import { toRefs, ref, watchEffect, computed } from 'vue';
import { TreeNodeKey } from '../interface';
import { getCheckedStateByInitKeys, Key2TreeNode } from '../utils';

export default function useCheckedState(props: {
  defaultCheckedKeys: TreeNodeKey[] | undefined;
  checkedKeys: TreeNodeKey[] | undefined;
  key2TreeNode: Key2TreeNode;
  checkStrictly: boolean;
}) {
  const {
    defaultCheckedKeys,
    checkedKeys: propCheckedKeys,
    key2TreeNode,
    checkStrictly,
  } = toRefs(props);

  const getStateByInitKeys = (initKeys: TreeNodeKey[]) => {
    return getCheckedStateByInitKeys({
      initCheckedKeys: initKeys,
      key2TreeNode: key2TreeNode.value,
      checkStrictly: checkStrictly.value,
    });
  };

  const isInitialized = ref(false);

  const initLocalState = getStateByInitKeys(
    propCheckedKeys.value || defaultCheckedKeys?.value || []
  );
  const localCheckedKeys = ref(initLocalState[0]);
  const localIndeterminateKeys = ref(initLocalState[1]);

  const computedCheckedKeys = ref<TreeNodeKey[]>();
  const computedIndeterminateKeys = ref<TreeNodeKey[]>();

  watchEffect(() => {
    if (propCheckedKeys.value) {
      [computedCheckedKeys.value, computedIndeterminateKeys.value] =
        getStateByInitKeys(propCheckedKeys.value);
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
    indeterminateKeys: computed(
      () => computedIndeterminateKeys.value || localIndeterminateKeys.value
    ),
    setCheckedState(
      newCheckedKeys: TreeNodeKey[],
      newIndeterminateKeys: TreeNodeKey[]
    ) {
      localCheckedKeys.value = newCheckedKeys;
      localIndeterminateKeys.value = newIndeterminateKeys;
    },
  };
}
