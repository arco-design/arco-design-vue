<template>
  <sd-tree-select :data="treeData" default-value="node1" @change="onChange">
    <template #trigger>
      <sd-typography-paragraph class="sd:w-75">
        You selected: <a href="javascript: void(0)">{{ text }}</a>
      </sd-typography-paragraph>
    </template>
  </sd-tree-select>
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
      key: 'node1',
      title: 'node1',
      children: [
        {
          key: 'node2',
          title: 'node2',
        },
      ],
    },
    {
      key: 'node3',
      title: 'node3',
      children: [
        {
          key: 'node4',
          title: 'node4',
        },
        {
          key: 'node5',
          title: 'node5',
          children: [
            {
              key: 'node6',
              title: 'node6',
            },
            {
              key: 'node7',
              title: 'node7',
            },
          ],
        },
      ],
    },
  ];

  const text = ref('node1');

  function onChange(selected: Parameters<TreeSelectChangeHandler>[0]) {
    text.value = String(selected ?? '');
  }
</script>
