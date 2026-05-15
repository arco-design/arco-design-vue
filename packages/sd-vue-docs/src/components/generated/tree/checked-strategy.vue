<template>
  <sd-radio-group
    type="button"
    v-model="checkedStrategy"
    @change="
      (value) => {
        checkedKeys = [];
      }
    "
  >
    <sd-radio v-for="item in strategyOptions" :key="item?.value" :value="item?.value">
      {{ item?.label }}
    </sd-radio>
  </sd-radio-group>
  <br />
  <sd-typography-text class="sd:my-6 sd:inline-block">
    Current: {{ checkedKeys?.join(' , ') }}
  </sd-typography-text>
  <br />
  <sd-tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :checked-strategy="checkedStrategy"
    :data="treeData"
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

  const strategyOptions: Array<{ value: CheckedStrategy; label: string }> = [
    {
      value: 'all',
      label: 'show all',
    },
    {
      value: 'parent',
      label: 'show parent',
    },
    {
      value: 'child',
      label: 'show child',
    },
  ];

  const checkedKeys = ref<TreeNodeKey[]>([]);
  const checkedStrategy = ref<CheckedStrategy>('all');
</script>
