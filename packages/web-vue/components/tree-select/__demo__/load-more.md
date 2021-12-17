```yaml
title:
  zh-CN: 动态加载
  en-US: Dynamic Loading
```

## zh-CN

可以通过 `loadMore` 进行动态加载。此时可设置 `isLeaf` 来标示叶子节点。

---

## en-US

Load nodes dynamically via `loadMore`. At this time, `isLeaf` can be set to indicate leaf nodes.

---

```vue
<template>
  <a-tree-select
    :data="treeData"
    :load-more="loadMore"
    placeholder="Please select ..."
    style="width: 300px"
  ></a-tree-select>
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const treeData = ref(defaultTreeData);
      const loadMore = (nodeData) => {
        const { title, key } = nodeData;
        const children = [
          { title: `${title}-0`, value: `${title}-0`, key: `${key}-0` },
          { title: `${title}-1`, value: `${title}-1`, key: `${key}-1` },
        ];

        return new Promise((resolve) => {
          setTimeout(() => {
            nodeData.children = children;
            resolve();
          }, 1000);
        });
      };

      return {
        treeData,
        loadMore,
      };
    },
  };

  const defaultTreeData = [
    {
      key: 'node1',
      title: 'node1',
      disabled: true,
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
      children: [
        {
          key: 'node4',
          title: 'node4',
          isLeaf: true,
        },
        {
          key: 'node5',
          title: 'node5',
          isLeaf: true,
        },
      ],
    },
  ];
</script>
```
