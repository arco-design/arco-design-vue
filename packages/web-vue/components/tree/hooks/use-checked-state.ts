import { toRefs, ref, watchEffect, computed } from 'vue';
import { getCheckedStateByInitKeys, Key2TreeNode } from '../utils';

export default function useCheckedState(props: {
  defaultCheckedKeys: string[] | undefined;
  checkedKeys: string[] | undefined;
  key2TreeNode: Key2TreeNode;
  checkStrictly: boolean;
}) {
  const {
    defaultCheckedKeys,
    checkedKeys: propCheckedKeys,
    key2TreeNode,
    checkStrictly,
  } = toRefs(props);

  const getStateByInitKeys = (initKeys: string[]) => {
    return getCheckedStateByInitKeys({
      initCheckedKeys: initKeys,
      key2TreeNode: key2TreeNode.value,
      checkStrictly: checkStrictly.value,
    });
  };

  const initLocalState = getStateByInitKeys(
    propCheckedKeys.value || defaultCheckedKeys?.value || []
  );
  const localCheckedKeys = ref(initLocalState[0]);
  const localIndeterminateKeys = ref(initLocalState[1]);

  const computedCheckedKeys = ref<string[]>();
  const computedIndeterminateKeys = ref<string[]>();
  watchEffect(() => {
    if (propCheckedKeys.value) {
      [computedCheckedKeys.value, computedIndeterminateKeys.value] =
        getStateByInitKeys(propCheckedKeys.value);
    } else {
      computedCheckedKeys.value = undefined;
      computedIndeterminateKeys.value = undefined;
      localCheckedKeys.value = [];
      localIndeterminateKeys.value = [];
    }
  });

  return {
    checkedKeys: computed(
      () => computedCheckedKeys.value || localCheckedKeys.value
    ),
    indeterminateKeys: computed(
      () => computedIndeterminateKeys.value || localIndeterminateKeys.value
    ),
    setCheckedState(newCheckedKeys: string[], newIndeterminateKeys: string[]) {
      localCheckedKeys.value = newCheckedKeys;
      localIndeterminateKeys.value = newIndeterminateKeys;
    },
  };
}
