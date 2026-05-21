<template>
  <div>
    <sd-input-search class="sd:max-w-60 sd:mb-2" v-model="searchKey" />
    <sd-tree :data="treeData">
      <template #title="nodeData">
        <template v-if="getNodeMatchIndex(nodeData) < 0">{{ getNodeTitle(nodeData) }}</template>
        <span v-else>
          {{ getNodeTitle(nodeData).substr(0, getNodeMatchIndex(nodeData)) }}
          <span class="sd:text-[var(--color-primary-light-4)]">
            {{
              getNodeTitle(nodeData).substr(getNodeMatchIndex(nodeData), searchKey.length)
            }} </span
          >{{ getNodeTitle(nodeData).substr(getNodeMatchIndex(nodeData) + searchKey.length) }}
        </span>
      </template>
    </sd-tree>
  </div>
</template>
<script setup lang="ts">
  import type { TreeNodeData } from '@sdata/web-vue';

  import { computed, ref } from 'vue';

  const originTreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf 0-0-1-1',
              key: '0-0-1-1',
            },
            {
              title: 'Leaf 0-0-1-2',
              key: '0-0-1-2',
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
              title: 'Leaf 0-1-1-0',
              key: '0-1-1-0',
            },
          ],
        },
        {
          title: 'Branch 0-1-2',
          key: '0-1-2',
          children: [
            {
              title: 'Leaf 0-1-2-0',
              key: '0-1-2-0',
            },
          ],
        },
      ],
    },
  ];

  const searchKey = ref('');
  const treeData = computed(() => {
    if (!searchKey.value) return originTreeData;
    return searchData(searchKey.value);
  });

  function searchData(keyword: string) {
    const loop = (data: TreeNodeData[]): TreeNodeData[] => {
      const result: TreeNodeData[] = [];
      data.forEach((item) => {
        if (
          String(item.title ?? '')
            .toLowerCase()
            .indexOf(keyword.toLowerCase()) > -1
        ) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            });
          }
        }
      });
      return result;
    };

    return loop(originTreeData);
  }

  function getMatchIndex(title: string) {
    if (!searchKey.value) return -1;
    return title.toLowerCase().indexOf(searchKey.value.toLowerCase());
  }

  function getNodeTitle(nodeData?: TreeNodeData) {
    return String(nodeData?.title ?? '');
  }

  function getNodeMatchIndex(nodeData?: TreeNodeData) {
    return getMatchIndex(getNodeTitle(nodeData));
  }
</script>
