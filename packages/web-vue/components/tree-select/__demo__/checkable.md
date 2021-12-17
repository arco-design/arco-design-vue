```yaml
title:
  zh-CN: 复选框多选
  en-US: Checkable
```

## zh-CN

可以通过设置 `treeCheckable` 属性开启复选框勾选。

---

## en-US

The `treeCheckable` property can display checkbox.

---

```vue
<template>
  <div style="marginBottom: 24px;">
    <a-checkbox
      v-model="treeCheckStrictly"
      @change="() => {
        selected = [];
      }"
    >
    treeCheckStrictly
    </a-checkbox>
  </div>
  <a-tree-select
    v-model="selected"
    :allow-search="true"
    :allow-clear="true"
    :tree-checkable="true"
    :tree-check-strictly="treeCheckStrictly"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px;"
  ></a-tree-select>
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const selected = ref([]);
      const treeCheckStrictly = ref(false);

      return {
        selected,
        treeCheckStrictly,
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk 0-0',
      value: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf 0-0-1',
          value: 'Leaf 0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          value: 'Branch 0-0-2',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf 0-0-2-1',
              value: 'Leaf 0-0-2-1',
              key: '0-0-2-1'
            }
          ]
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      value: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          value: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
          children: [
            {
              title: 'Leaf 0-1-1-1',
              value: 'Leaf 0-1-1-1',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf 0-1-1-2',
              value: 'Leaf 0-1-1-2',
              key: '0-1-1-2',
              disabled: true
            },
          ]
        },
        {
          title: 'Leaf 0-1-2',
          value: 'Leaf 0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];
</script>
```
