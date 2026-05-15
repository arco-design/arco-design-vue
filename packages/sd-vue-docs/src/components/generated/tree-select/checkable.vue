<template>
  <div class="sd:mb-6">
    <sd-checkbox
      v-model="treeCheckStrictly"
      @change="
        () => {
          selected = [];
        }
      "
    >
      treeCheckStrictly
    </sd-checkbox>
  </div>
  <sd-tree-select
    v-model="selected"
    :allow-search="true"
    :allow-clear="true"
    :tree-checkable="true"
    :tree-check-strictly="treeCheckStrictly"
    :data="treeData"
    placeholder="Please select ..."
    class="sd:w-75"
  ></sd-tree-select>
</template>
<script setup lang="ts">
  import type {
    CheckedStrategy,
    LabelValue,
    Size,
    TreeNodeData,
    TreeNodeKey,
    TreeSelectChangeHandler,
    TreeSelectFallbackOption,
    TreeSelectFilterTreeNode,
    TreeSelectLoadMore,
    TreeSelectSearchHandler,
  } from '@sdata/web-vue';

  import { ref } from 'vue';

  const treeData: TreeNodeData[] = [
    {
      title: 'Trunk 0-0',
      value: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          value: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          value: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
              value: 'Leaf 0-0-2-1',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      value: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          value: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              value: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              value: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
              disabled: true,
            },
          ],
        },
        {
          title: 'Leaf 0-1-2',
          value: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const selected = ref<LabelValue[]>([]);
  const treeCheckStrictly = ref(false);
</script>
