<template>
  <sd-tree
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-0-0', '0-0-1']"
  />
</template>
<script setup lang="ts">
  import type {
    CheckedStrategy,
    LoadMore,
    Size,
    TreeCheckHandler,
    TreeDropHandler,
    TreeExpandHandler,
    TreeNodeData,
    TreeNodeKey,
    TreeSelectHandler,
  } from '@sdata/web-vue';

  const treeData: TreeNodeData[] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0',
            },
            {
              title: 'Leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];
</script>
