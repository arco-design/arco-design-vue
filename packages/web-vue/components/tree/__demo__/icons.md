```yaml
title:
  zh-CN: 定制组件图标
  en-US: Component Icons
```

## zh-CN

节点的图标 `loadingIcon`,  `switcherIcon`，同时支持在 `tree` 和 `node` 两个纬度上定制，其中 `node` 的优先级较高。

---

## en-US

The node icons `loadingIcon`, `switcherIcon`, support customization at the two latitudes of `tree` and `node` at the same time, and `node` has a higher priority.

---

```vue
<template>
  <a-tree :data="treeData" show-line>
     <template #switcher-icon="node, { isLeaf }">
      <IconDown v-if="!isLeaf" />
      <IconStar v-if="isLeaf" />
    </template>
  </a-tree>
</template>

<script>
  import { h } from 'vue';
  import { IconDriveFile, IconDown, IconStar } from '@arco-design/web-vue/es/icon';

  export default {
    components: {
      IconDown,
      IconStar
    },
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
      children: [
        {
          title: 'Leaf',
          key: 'node2',
        },
      ],
    },
    {
      title: 'Trunk',
      key: 'node3',
      children: [
        {
          title: 'Leaf',
          key: 'node4',
          switcherIcon: () => h(IconDriveFile),
        },
        {
          title: 'Leaf',
          key: 'node5',
          switcherIcon: () => h(IconDriveFile),
        },
      ],
    },
  ];
</script>
```
