```yaml
title:
  zh-CN: 回退选项
  en-US: Fallback Option
```

## zh-CN

使用 `fallback-option` 自定义找不到选项的值的显示效果，默认找不到选项就展示值本身。用户可以将其设定为 `false` 来隐藏那些没有匹配到节点数据的值。

---

## en-US

Use `fallback-option` to customize the display effect of the value of the option that is not found. By default, the value itself is displayed when the option is not found. Users can set this to `false` to hide values that do not match node data.

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-tree-select
      defaultValue="node0"
      placeholder="Please select ..."
      style="width: 300px"
      :data="treeData"
    />
    <a-tree-select
      defaultValue="node0"
      placeholder="Please select ..."
      style="width: 300px"
      :data="treeData"
      :fallback-option="false"
    />
    <a-tree-select
      defaultValue="node0"
      placeholder="Please select ..."
      style="width: 300px"
      :data="treeData"
      :fallback-option="fallback"
    />
    <a-tree-select
      placeholder="Please select ..."
      style="width: 300px"
      multiple
      :defaultValue="['node0', 'node2']"
      :data="treeData"
    />
    <a-tree-select
      multiple
      placeholder="Please select ..."
      style="width: 300px"
      :defaultValue="['node0', 'node2']"
      :data="treeData"
      :fallback-option="false"
    />
    <a-tree-select
      multiple
      placeholder="Please select ..."
      style="width: 300px"
      :default-value="['node0', 'node2']"
      :data="treeData"
      :fallback-option="fallback"
    />
  </a-space>
</template>

<script setup lang="ts">
const treeData = [
  {
    key: 'node1',
    title: 'Trunk1',
    children: [
      {
        key: 'node2',
        title: 'Leaf1',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    children: [
      {
        key: 'node4',
        title: 'Leaf2',
      },
      {
        key: 'node5',
        title: 'Leaf3',
      },
    ],
  },
];

const fallback = (key: string) => {
  return {
    key,
    title: `++${key}++`,
  };
};
</script>
```
