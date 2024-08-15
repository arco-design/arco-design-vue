```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

通过指定 `treeProps.virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

---

## en-US

By specifying `treeProps.virtualListProps` to turn on the virtual list, high performance can be obtained when a large
amount of data is used.

```vue
<template>
  <a-tree-select
    :data="treeData"
    :allow-search="{
      retainInputValue: true
    }"
    multiple
    tree-checkable
    :scrollbar="false"
    tree-checked-strategy="parent"
    :treeProps="{
      virtualListProps: {
        height: 200,
      },
    }"
  />
</template>
<script>
export default {
  setup() {
    const treeData = loop();
    return {
      treeData
    }
  }
}

function loop(path = '0', level = 2) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = loop(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}
</script>
```
