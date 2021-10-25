<template>
  <Tree
    ref="refTree"
    v-bind="computedTreeProps"
    :checkable="checkable"
    @select="onSelect"
    @check="onCheck"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import Tree from '../tree';
import { TreeProps } from '../tree/interface';

export default defineComponent({
  name: 'TreeSelectPanel',
  components: {
    Tree,
  },
  props: {
    treeProps: {
      type: Object as PropType<Partial<TreeProps>>,
      default: () => ({}),
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
    },
    checkable: {
      type: Boolean,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { checkable, selectedKeys, treeProps } = toRefs(props);

    const refTree = ref();

    const computedTreeProps = computed(() => {
      const isCheckbox = checkable.value;
      return {
        ...treeProps.value,
        checkedKeys: isCheckbox ? selectedKeys.value : [],
        selectedKeys: isCheckbox ? [] : selectedKeys.value,
      };
    });

    return {
      refTree,
      computedTreeProps,
      onSelect(newVal: string[], e: Event) {
        if (checkable.value) {
          refTree.value?.toggleCheck?.(newVal[0], e);
        } else {
          emit('change', newVal);
        }
      },
      onCheck(newVal: string[]) {
        emit('change', newVal);
      },
    };
  },
});
</script>
