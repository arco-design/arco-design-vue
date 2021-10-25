```yaml
title:
  zh-CN: 不同尺寸
  en-US: Size
```

## zh-CN

不同尺寸的树。

---

## en-US

Trees of different sizes.

---

```vue
<template>
  <div style="margin-bottom: 20px;">
    <a-radio-group v-model="size" type='button'>
      <a-radio value="mini">mini</a-radio>
      <a-radio value="small">small</a-radio>
      <a-radio value="medium">medium</a-radio>
      <a-radio value="large">large</a-radio>
    </a-radio-group>
  </div>
  <a-tree
    style="margin-right: 20px;"
    :blockNode="true"
    :checkable="true"
    :size="size"
    :data="treeData" />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const size = ref('medium');

      return {
        size,
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
