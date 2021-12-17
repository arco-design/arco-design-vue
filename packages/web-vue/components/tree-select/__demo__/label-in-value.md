```yaml
title:
  zh-CN: 设置 value 格式
  en-US: Value Format
```

## zh-CN

`labelInValue` 为 `true` 时，`value` 格式为： `{ label: string, value: string }`。

---

## en-US

When `labelInValue` is `true`, the format of `value` is: `{ label: string, value: string }`.

---

```vue
<template>
  <a-tree-select
    :data="treeData"
    :label-in-value="true"
    :default-value="{ value: 'node2', label: 'Leaf' }"
    placeholder="Please select ..."
    style="width: 300px"
    @change="onChange"
  ></a-tree-select>
</template>
<script>
  import { h } from 'vue';
  import { IconCalendar } from '@arco-design/web-vue/es/icon';

  export default {
    setup() {
      function onChange(value) {
        console.log(value);
      }

      return {
        onChange,
        treeData,
      };
    },
  };

  const treeData = [
    {
      key: 'node1',
      icon: () => h(IconCalendar),
      title: 'Trunk',
      disabled: true,
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
  ];
</script>
```
