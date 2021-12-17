```yaml
title:
  zh-CN: 自定义 TreeData 的字段名称
  en-US: Customize treeData
```

## zh-CN

通过 `fieldNames` 字段可以自定义 TreeData 的字段名。

---

## en-US

You can customize `treeData` by `fieldNames`.

---

```vue
<template>
  <a-tree-select
    default-value="0-0-1"
    :fieldNames="{
      key: 'value',
      title: 'label',
      children: 'items'
    }"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px;"
  ></a-tree-select>
</template>
<script>
  export default {
    setup() {
      return {
        treeData,
      };
    },
  };

  const treeData = [
    {
      label: 'Trunk 0-0',
      value: '0-0',
      items: [
        {
          label: 'Branch 0-0-2',
          value: '0-0-2',
          selectable: false,
          items: [
            {
              label: 'Leaf',
              value: '0-0-2-1',
              items: [
                {
                  label: 'Leaf 0-0-2',
                  value: '0-0-2-1-0',
                  items: [
                    {
                      label: 'Leaf',
                      value: '0-0-2-1-0-0'
                    }
                  ]
                },
              ],
            }
          ]
        },
      ],
    },
    {
      label: 'Trunk 0-1',
      value: '0-1',
      items: [
        {
          label: 'Branch 0-1-1',
          value: '0-1-1',
          items: [
            {
              label: 'Leaf',
              value: '0-1-1-0',
            }
          ]
        },
      ],
    },
  ];
</script>
```

