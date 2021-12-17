```yaml
title:
  zh-CN: 多选
  en-US: Multiple Selection
```

## zh-CN

多选

---

## en-US

Multiple Selection

---

```vue
<template>
  <a-space>
    <a-tree-select
      v-model="selected"
      :multiple="true"
      :allow-clear="true"
      :allow-search="true"
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    ></a-tree-select>
    <a-tree-select
      v-model="selected"
      :multiple="true"
      :max-tag-count="2"
      :allow-clear="true"
      :allow-search="true"
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    ></a-tree-select>
  </a-space>
</template>
<script>
  import { h, ref } from 'vue';
  import { IconCalendar } from '@arco-design/web-vue/es/icon';

  export default {
    setup() {
      const selected = ref([]);

      return {
        selected,
        treeData,
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
      icon: () => h(IconCalendar),
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
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node4',
          title: 'node4',
        },
        {
          key: 'node5',
          title: 'node5',
        },
      ],
    },
  ];
</script>
```
