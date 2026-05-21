<template>
  <sd-tree-select
    :allow-search="true"
    :allow-clear="true"
    :disable-filter="true"
    :data="treeData"
    :loading="loading"
    class="sd:w-75"
    placeholder="Please select ..."
    @search="onSearch"
  ></sd-tree-select>
</template>
<script setup lang="ts">
  import type { TreeNodeData, TreeSelectSearchHandler } from '@sdata/web-vue';

  import { ref } from 'vue';

  const defaultTreeData = [
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

  const treeData = ref<TreeNodeData[]>(defaultTreeData);
  const loading = ref(false);

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

    return loop(defaultTreeData);
  }

  const onSearch: TreeSelectSearchHandler = (searchKey) => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      treeData.value = searchData(searchKey);
    }, 200);
  };
</script>
