```yaml
title:
  zh-CN: 自定义触发元素
  en-US: Customize trigger element
```

## zh-CN

自定义触发元素。

---

## en-US

Customize trigger element.

---

```vue
<template>
  <a-tree-select :data="treeData" default-value="node1" @change="handleChange">
    <template #trigger>
      <a-typography-paragraph style="width: 300px">
        You selected: <a href="javascript: void(0)">{{ text }}</a>
      </a-typography-paragraph>
    </template>
  </a-tree-select>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const treeData = [
  {
    key: 'node1',
    title: 'node1',
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
      },
      {
        key: 'node5',
        title: 'node5',
        children: [
          {
            key: 'node6',
            title: 'node6',
          },
          {
            key: 'node7',
            title: 'node7',
          },
        ],
      },
    ],
  },
];

const text = ref('node1');

function handleChange(selected) {
  text.value = selected;
}
</script>
```
