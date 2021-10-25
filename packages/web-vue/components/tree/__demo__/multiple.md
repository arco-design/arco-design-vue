```yaml
title:
  zh-CN: 多选
  en-US: Multiple Selection
```

## zh-CN

`Tree` 设置 `multiple` 属性为`true`，可以启用多选。

---

## en-US

Add `:multiple="true"` to `Tree` to enable multiple selection.

---

```vue
<template>
  <a-checkbox
    style="marginBottom: 24px;"
    v-model="multiple"
    @change="() => {
      selectedKeys = [];
    }"
  >
    multiple
  </a-checkbox>
  <br/>
  <a-typography-text>
    Current: {{ selectedKeys?.join(' , ') }}
  </a-typography-text>
  <br/>
  <a-tree
    v-model:selected-keys="selectedKeys"
    :multiple="multiple"
    :data="treeData"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const selectedKeys = ref([]);
      const multiple = ref(true);
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
          title: 'Trunk 0-1',
          key: '0-1',
          children: [
            {
              title: 'Branch 0-1-1',
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
      ];

      return {
        selectedKeys,
        multiple,
        treeData,
      };
    },
  }
</script>
```
