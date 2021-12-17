```yaml
title:
  zh-CN: 搜索
  en-US: Search
```

## zh-CN

设置 `:allow-search="true"` 启用搜索功能。动态加载时候只能在已加载数据中进行搜索。默认的关键字搜索是从`value`字段匹配。也可以传入 `filterTreeNode`自定义过滤方式。

---

## en-US

Set `:allow-search="true"` to enable the search function. You can only search in the loaded data during dynamic loading. The default keyword search is to match from the `value` field. You can also pass in `filterTreeNode` to customize the filtering method.

---

```vue
<template>
  <a-space>
    <a-tree-select
      :allow-search="true"
      :allow-clear="true"
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    ></a-tree-select>
    <a-tree-select
      :allow-search="true"
      :allow-clear="true"
      :data="treeData"
      :filter-tree-node="filterTreeNode"
      placeholder="Please select ..."
      style="width: 300px"
    ></a-tree-select>
  </a-space>
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      function filterTreeNode(searchValue, nodeData) {
        return nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
      }

      return {
        filterTreeNode,
        treeData,
      };
    },
  };

  const treeData = [
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
</script>
```
