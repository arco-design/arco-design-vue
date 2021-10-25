```yaml
title:
  zh-CN: 设置回填方式
  en-US: Checked Strategy
```

## zh-CN

为 `Tree` 添加 `checkedStrategy` 可以设置选中时的回填方式

---

## en-US

Add `checkedStrategy` to set the return value when selected.

---

```vue
<template>
  <a-radio-group
    type='button'
    v-model="checkedStrategy"
    @change="(value) => {
      checkedKeys = []
    }"
  >
    <a-radio
      v-for="item in strategyOptions"
      :key="item?.value"
      :value="item?.value"
    >
      {{ item?.label }}
    </a-radio>
  </a-radio-group>
  <br/>
  <a-typography-text style="margin: 24px 0; display: inline-block;">
    Current: {{ checkedKeys?.join(' , ') }}
  </a-typography-text>
  <br/>
  <a-tree
    :checkable="true"
    v-model:checked-keys="checkedKeys"
    :checked-strategy="checkedStrategy"
    :data="treeData"
  />
</template>
<script>
  import { ref } from 'vue';

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

  const strategyOptions = [
    {
      value: 'all',
      label: 'show all'
    },
    {
      value: 'parent',
      label: 'show parent'
    },
    {
      value: 'child',
      label: 'show child'
    }
  ];

  export default {
    setup() {
      const checkedKeys = ref([]);
      const checkedStrategy = ref('all');

      return {
        treeData,
        strategyOptions,
        checkedStrategy,
        checkedKeys,
      }
    }
  }
</script>
```
