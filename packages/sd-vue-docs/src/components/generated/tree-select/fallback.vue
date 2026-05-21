<template>
  <sd-space direction="vertical" size="large">
    <sd-tree-select
      defaultValue="node0"
      :data="treeData"
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
    <sd-tree-select
      defaultValue="node0"
      :data="treeData"
      :fallback-option="false"
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
    <sd-tree-select
      defaultValue="node0"
      :data="treeData"
      :fallback-option="fallback"
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
    <sd-tree-select
      :defaultValue="['node0', 'node2']"
      :data="treeData"
      multiple
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
    <sd-tree-select
      :defaultValue="['node0', 'node2']"
      :data="treeData"
      :fallback-option="false"
      multiple
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
    <sd-tree-select
      :default-value="['node0', 'node2']"
      :data="treeData"
      :fallback-option="fallback"
      multiple
      placeholder="Please select ..."
      class="sd:w-75"
    ></sd-tree-select>
  </sd-space>
</template>

<script setup lang="ts">
  import type { TreeNodeData, TreeNodeKey } from '@sdata/web-vue';

  const treeData: TreeNodeData[] = [
    {
      key: 'node1',
      title: 'Trunk1',
      children: [
        {
          key: 'node2',
          title: 'Leaf1',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf2',
        },
        {
          key: 'node5',
          title: 'Leaf3',
        },
      ],
    },
  ];

  function fallback(key: TreeNodeKey) {
    return {
      key,
      title: `++${key}++`,
    };
  }
</script>
