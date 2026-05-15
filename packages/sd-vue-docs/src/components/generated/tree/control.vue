<template>
  <sd-button-group class="sd:mb-5">
    <sd-button type="primary" @click="toggleChecked">
      {{ checkedKeys?.length ? 'deselect all' : 'select all' }}
    </sd-button>
    <sd-button type="primary" @click="toggleExpanded">
      {{ expandedKeys?.length ? 'fold' : 'unfold' }}
    </sd-button>
  </sd-button-group>
  <sd-tree
    :checkable="true"
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    v-model:expanded-keys="expandedKeys"
    @select="onSelect"
    @check="onCheck"
    @expand="onExpand"
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

  const allCheckedKeys = ['0-0', '0-0-1', '0-0-2', '0-0-2-1', '0-1', '0-1-1', '0-1-2'];
  const allExpandedKeys = ['0-0', '0-1', '0-0-2'];

  const treeData: TreeNodeData[] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
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
          title: 'Leaf 0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const selectedKeys = ref<TreeNodeKey[]>([]);
  const checkedKeys = ref<TreeNodeKey[]>([]);
  const expandedKeys = ref<TreeNodeKey[]>([]);

  function toggleChecked() {
    checkedKeys.value = checkedKeys?.value.length ? [] : allCheckedKeys;
  }

  function toggleExpanded() {
    expandedKeys.value = expandedKeys?.value.length ? [] : allExpandedKeys;
  }

  function onSelect(
    newSelectedKeys: Parameters<TreeSelectHandler>[0],
    event: Parameters<TreeSelectHandler>[1],
  ) {
    console.log('select: ', newSelectedKeys, event);
  }

  function onCheck(
    newCheckedKeys: Parameters<TreeCheckHandler>[0],
    event: Parameters<TreeCheckHandler>[1],
  ) {
    console.log('check: ', newCheckedKeys, event);
  }

  function onExpand(
    newExpandedKeys: Parameters<TreeExpandHandler>[0],
    event: { expanded?: boolean; expandedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event },
  ) {
    console.log('expand: ', newExpandedKeys, event);
  }
</script>
