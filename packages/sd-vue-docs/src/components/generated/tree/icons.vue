<template>
  <sd-tree :data="treeData" show-line>
    <template #switcher-icon="{ isLeaf }">
      <IconDown v-if="!isLeaf" />
      <IconStar v-if="isLeaf" />
    </template>
  </sd-tree>
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

  import { h } from 'vue';

  import { IconDown, IconDriveFile, IconStar } from '@sdata/web-vue/es/icon/index.js';

  const treeData: TreeNodeData[] = [
    {
      title: 'Trunk',
      key: 'node1',
      children: [
        {
          title: 'Leaf',
          key: 'node2',
        },
      ],
    },
    {
      title: 'Trunk',
      key: 'node3',
      children: [
        {
          title: 'Leaf',
          key: 'node4',
          switcherIcon: () => h(IconDriveFile),
        },
        {
          title: 'Leaf',
          key: 'node5',
          switcherIcon: () => h(IconDriveFile),
        },
      ],
    },
  ];
</script>
