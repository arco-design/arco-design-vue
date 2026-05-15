<template>
  <sd-form layout="inline" :model="form">
    <sd-form-item label="empty">
      <sd-switch v-model="form.empty" />
    </sd-form-item>
    <sd-form-item label="showHeaderOnEmpty">
      <sd-switch v-model="form.showHeaderOnEmpty" />
    </sd-form-item>
    <sd-form-item label="showFooterOnEmpty">
      <sd-switch v-model="form.showFooterOnEmpty" />
    </sd-form-item>
  </sd-form>
  <sd-tree-select
    class="sd:w-75"
    placeholder="Please select ..."
    :data="computedTreeData"
    :show-header-on-empty="form.showHeaderOnEmpty"
    :show-footer-on-empty="form.showFooterOnEmpty"
  >
    <template #header>
      <div class="sd:py-1.5 sd:px-3">
        <sd-checkbox value="1">All</sd-checkbox>
      </div>
    </template>
    <template #footer>
      <div class="sd:py-1.5 sd:text-center">
        <sd-button>Click Me</sd-button>
      </div>
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

  import { computed, h, reactive } from 'vue';

  import { IconCalendar } from '@sdata/web-vue/es/icon/index.js';

  const form = reactive({
    empty: false,
    showHeaderOnEmpty: false,
    showFooterOnEmpty: false,
  });

  const treeData: TreeNodeData[] = [
    {
      key: 'node1',
      icon: () => h(IconCalendar),
      title: 'Trunk',
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node6',
      title: 'Trunk3',
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node7',
          title: 'Leaf',
        },
        {
          key: 'node8',
          title: 'Leaf',
        },
      ],
    },
  ];

  const computedTreeData = computed(() => {
    return form.empty ? [] : treeData;
  });
</script>
