<template>
  <sd-tree :data="treeData" :load-more="loadMore" />
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const treeData = ref([
    {
      title: 'Trunk 0-0',
      key: '0-0',
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
        },
      ],
    },
  ]);

  const loadMore = (nodeData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        nodeData.children = [{ title: `leaf`, key: `${nodeData.key}-1`, isLeaf: true }];
        resolve();
      }, 1000);
    });
  };
</script>
