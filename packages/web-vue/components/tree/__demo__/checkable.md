```yaml
title:
  zh-CN: 带复选框的树
  en-US: Checkable
```

## zh-CN

为 `Tree` 添加 `checkable` 属性即可使树具有复选框功能，可以用 `defaultCheckedKeys` 指定复选框默认选中的节点。

---

## en-US

Add the `checkable` attribute to display the checkbox, and you can use `defaultCheckedKeys` to specify which nodes are checked by default.

---

```vue
<template>
  <a-checkbox
    style="marginBottom: 24px;"
    v-model="checkStrictly"
    @change="() => {
      checkedKeys = [];
    }"
  >
    checkStrictly
  </a-checkbox>
  <a-tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :check-strictly="checkStrictly"
    :data="treeData"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
    const checkedKeys = ref([]);
    const checkStrictly = ref(false);

      return {
        checkedKeys,
        checkStrictly,
        treeData,
      }
    }
  }

  const treeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1'
            },
            {
              title: 'Leaf',
              key: '0-0-2-2',
              disableCheckbox: true
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
              title: 'Leaf ',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf ',
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
  ];
</script>
```
