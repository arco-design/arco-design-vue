```yaml
title:
  zh-CN: 显示连接线
  en-US: Show Line
```

## zh-CN

为 `Tree` 添加 `showLine` 属性即可使树具有连接线

---

## en-US

Add the `showLine` property to `Tree` to display the connecting line.

---

```vue
<template>
  <div>
    <a-typography-text>showLine</a-typography-text>
    <a-switch v-model="showLine" style="margin-left: 12px" />
  </div>
  <a-tree
    :default-selected-keys="['0-0-1']"
    :data="treeData"
    :show-line="showLine"
  />
</template>
<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const showLine = ref(true);

      return {
        showLine,
        treeData,
      };
    },
  };

  const treeData = [
    {
      title: 'Trunk 1',
      key: '0-0',
      children: [
        {
          title: 'Trunk 1-0',
          key: '0-0-0',
          children: [
            { title: 'leaf', key: '0-0-0-0' },
            {
              title: 'leaf',
              key: '0-0-0-1',
              children: [{ title: 'leaf', key: '0-0-0-1-0' }],
            },
            { title: 'leaf', key: '0-0-0-2' },
          ],
        },
        {
          title: 'Trunk 1-1',
          key: '0-0-1',
        },
        {
          title: 'Trunk 1-2',
          key: '0-0-2',
          children: [
            { title: 'leaf', key: '0-0-2-0' },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 2',
      key: '0-1',
    },
    {
      title: 'Trunk 3',
      key: '0-2',
      children: [
        {
          title: 'Trunk 3-0',
          key: '0-2-0',
          children: [
            { title: 'leaf', key: '0-2-0-0' },
            { title: 'leaf', key: '0-2-0-1' },
          ],
        },
      ],
    },
  ];
</script>
```
