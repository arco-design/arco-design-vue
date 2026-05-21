<template>
  <sd-checkbox
    class="sd:mb-6"
    v-model="checkStrictly"
    @change="
      () => {
        checkedKeys = [];
      }
    "
  >
    checkStrictly
  </sd-checkbox>
  <sd-tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :check-strictly="checkStrictly"
    :data="treeData"
  />
</template>
<script setup lang="ts">
  import type { TreeNodeData, TreeNodeKey } from '@sdata/web-vue';

  import { ref } from 'vue';

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
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
            {
              title: 'Leaf',
              key: '0-0-2-2',
              disableCheckbox: true,
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
              title: 'Leaf ',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf ',
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

  const checkedKeys = ref<TreeNodeKey[]>([]);
  const checkStrictly = ref(false);
</script>
