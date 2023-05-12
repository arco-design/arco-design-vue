```yaml
title:
  zh-CN: 下拉框的页头和页脚
  en-US: Dropdown Header and Footer
```

## zh-CN

自定义树选择下拉框的页头和页脚

---

## en-US

Custom Tree Select the header and footer of the drop-down box.

---

```vue
<template>
  <a-space>
    <a-tree-select
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    >
      <template #header>
        <div style="padding: 6px 12px;" >
          <a-checkbox value="1">All</a-checkbox>
        </div>
      </template>
    </a-tree-select>
    <a-tree-select
      :data="treeData"
      placeholder="Please select ..."
      style="width: 300px"
    >
      <template #footer>
        <div style="padding: 6px 0; text-align: center;">
          <a-button>Click Me</a-button>
        </div>
      </template>
    </a-tree-select>
  </a-space>
</template>
<script>
  import { h } from 'vue';
  import { IconCalendar } from '@arco-design/web-vue/es/icon';

  export default {
    setup() {
      return {
        treeData
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
      icon: () => h(IconCalendar),
      title: 'Trunk',
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node6',
      title: 'Trunk3',
      icon: () => h(IconCalendar),
      children: [
        {
          key: 'node7',
          title: 'Leaf',
        },
        {
          key: 'node8',
          title: 'Leaf',
        },
      ],
    },
  ];
</script>
```
