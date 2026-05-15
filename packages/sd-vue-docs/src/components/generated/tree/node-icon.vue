<template>
  <sd-tree :data="treeData">
    <template #icon>
      <IconStar />
    </template>
  </sd-tree>
</template>
<script setup lang="ts">
  import { h } from 'vue';

  import { IconStar, IconDriveFile } from '@sdata/web-vue/es/icon/index.js';

  const treeData = [
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
          icon: () => h(IconDriveFile),
        },
        {
          title: 'Leaf',
          key: 'node5',
          icon: () => h(IconDriveFile),
        },
      ],
    },
  ];
</script>
