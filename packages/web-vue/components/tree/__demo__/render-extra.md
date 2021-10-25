```yaml
title:
  zh-CN: 定制额外节点
  en-US: Extra Node
```

## zh-CN

`Tree` 提供了名为 `extra` 的 `Slot`, 可以在节点上定制额外的内容。

---

## en-US

`Tree` provides `Slot` named `extra`, which can customize extra content on the node.

---

```vue
<template>
  <div style="width: 500px; padding: 2px; overflow: auto">
    <a-tree
      :blockNode="true"
      :checkable="true"
      :data="treeData"
    >
      <template #extra="nodeData">
        <IconPlus
          style="position: absolute; right: 8px; font-size: 12px; top: 10px; color: #3370ff;"
          @click="() => onIconClick(nodeData)"
        />
      </template>
    </a-tree>
  </div>
</template>
<script>
 import {ref} from 'vue';
 import { IconPlus } from '@arco-design/web-vue/es/icon';

 export default {
   components: {
     IconPlus,
   },
   setup() {
     function onIconClick(nodeData) {
      const children = nodeData.children || []
      children.push({
        title: 'new tree node',
        key: nodeData.key + '-' + (children.length + 1)
      })
      nodeData.children = children

      treeData.value = [...treeData.value];
    }

    const treeData = ref(
      [
        {
          title: 'Trunk',
          key: '0-0',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1',
            },
            {
              title: 'Branch',
              key: '0-0-2',
              children: [
                {
                  title: 'Leaf',
                  key: '0-0-2-1'
                }
              ]
            },
          ],
        },
        {
          title: 'Trunk',
          key: '0-1',
          children: [
            {
              title: 'Branch',
              key: '0-1-1',
              children: [
                {
                  title: 'Leaf',
                  key: '0-1-1-1',
                },
                {
                  title: 'Leaf',
                  key: '0-1-1-2',
                },
              ]
            },
            {
              title: 'Leaf',
              key: '0-1-2',
            },
          ],
        },
      ]
    );

    return {
      onIconClick,
      treeData,
    };
   }
 };
</script>
```
