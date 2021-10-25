```yaml
title:
  zh-CN: 定制节点图标
  en-US: Node Icon
```

## zh-CN

只需为节点指定 `icon` 属性的值即可为任意节点指定任意图标。

---

## en-US

The property `icon` of node can specify an icon for the node.

---

```vue
<template>
  <a-tree :data="treeData" />
</template>
<script>
  import { h } from 'vue';
  import { IconStar } from '@arco-design/web-vue/es/icon';

  export default {
    setup() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk',
      key: 'node1',
      icon: () => h(IconStar),
      children: [
        {
          title: 'Leaf',
          key: 'node2',
          icon: () => h(IconStar),
        },
      ],
    },
    {
      title: 'Trunk',
      key: 'node3',
      icon: () => h(IconStar),
      children: [
        {
          title: 'Leaf',
          key: 'node4',
          icon: () => h(IconStar),
        },
        {
          title: 'Leaf',
          key: 'node5',
          icon: () => h(IconStar),
        },
      ],
    },
  ];
</script>
```
