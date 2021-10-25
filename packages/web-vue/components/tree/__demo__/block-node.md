```yaml
title:
  zh-CN: 节点占一行
  en-US: BlockNode
```

## zh-CN

节点占据一整行。
---

## en-US

The treeNode occupy the remaining horizontal space.

---

```vue
<template>
  <a-tree blockNode :data="treeData" />
</template>
<script>
  export default {
    data() {
      return {
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
          title: 'Branch 0-0-0',
          key: '0-0-0',
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0',
            },
            {
              title: 'Leaf',
              key: '0-0-0-1',
            }
          ]
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0',
            },
          ]
        },
      ],
    },
  ];
</script>
```

