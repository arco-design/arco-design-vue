<template>
  <sd-checkbox
    class="sd:mb-6"
    v-model="multiple"
    @change="
      () => {
        selectedKeys = [];
      }
    "
  >
    multiple
  </sd-checkbox>
  <br />
  <sd-typography-text> Current: {{ selectedKeys?.join(' , ') }} </sd-typography-text>
  <br />
  <sd-tree v-model:selected-keys="selectedKeys" :multiple="multiple" :data="treeData" />
</template>
<script setup lang="ts">
  import type { TreeNodeData, TreeNodeKey } from '@sdata/web-vue';

  import { ref } from 'vue';

  const selectedKeys = ref<TreeNodeKey[]>([]);
  const multiple = ref(true);
  const treeData: TreeNodeData[] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf',
          key: '0-1-2',
        },
      ],
    },
  ];
</script>
