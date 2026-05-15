<template>
  <sd-space>
    <sd-tree-select
      v-model="selected"
      :multiple="true"
      :allow-clear="true"
      :allow-search="true"
      :data="treeData"
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
    <sd-tree-select
      v-model="selected"
      :multiple="true"
      :max-tag-count="2"
      :allow-clear="true"
      :allow-search="true"
      :data="treeData"
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
  </sd-space>
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

  import { h, ref } from 'vue';

  import { IconCalendar } from '@sdata/web-vue/es/icon/index.js';

  const treeData: TreeNodeData[] = [
    {
      key: 'node1',
      icon: () => h(IconCalendar),
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
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node4',
          title: 'node4',
        },
        {
          key: 'node5',
          title: 'node5',
        },
      ],
    },
  ];

  const selected = ref<LabelValue[]>([]);
</script>
