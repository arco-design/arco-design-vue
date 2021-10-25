```yaml
title:
  zh-CN: 搜索树
  en-US: Searchable
```

## zh-CN

展示如何实现搜索树的效果。

---

## en-US

Show how to achieve the search tree effect.

---

```vue
<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px; max-width: 240px"
      v-model="searchKey"
    />
    <a-tree :data="treeData">
      <template #title="nodeData">
        <template v-if="index = getMatchIndex(nodeData?.title), index < 0">{{ nodeData?.title }}</template>
        <span v-else>
          {{ nodeData?.title?.substr(0, index) }}
          <span style="color: var(--color-primary-light-4);">
            {{ nodeData?.title?.substr(index, searchKey.length) }}
          </span>{{ nodeData?.title?.substr(index + searchKey.length) }}
        </span>
      </template>
    </a-tree>
  </div>
</template>
<script>
  import { ref, computed } from 'vue';

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
              key: '0-0-1-1'
            },
            {
              title: 'Leaf 0-0-1-2',
              key: '0-0-1-2'
            }
          ]
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
            }
          ]
        },
        {
          title: 'Branch 0-1-2',
          key: '0-1-2',
          children: [
            {
              title: 'Leaf 0-1-2-0',
              key: '0-1-2-0',
            }
          ]
        },
      ],
    },
  ];

  export default {
    setup() {
      const searchKey = ref('');
      const treeData = computed(() => {
        if (!searchKey.value) return originTreeData;
        return searchData(searchKey.value);
      })

      function searchData(keyword) {
        const loop = (data) => {
          const result = [];
          data.forEach(item => {
            if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
              result.push({...item});
            } else if (item.children) {
              const filterData = loop(item.children);
              if (filterData.length) {
                result.push({
                  ...item,
                  children: filterData
                })
              }
            }
          })
          return result;
        }

        return loop(originTreeData);
      }

      function getMatchIndex(title) {
        if (!searchKey.value) return -1;
        return title.toLowerCase().indexOf(searchKey.value.toLowerCase());
      }

      return {
        searchKey,
        treeData,
        getMatchIndex,
      }
    }
  }
</script>
```
