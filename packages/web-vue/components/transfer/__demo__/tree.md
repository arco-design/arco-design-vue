```yaml
title:
  zh-CN: 树型穿梭框
  en-US: Tree Transfer
```

## zh-CN

通过穿梭框自定义接口可以实现树型穿梭框。

---

## en-US

The tree-type shuttle box can be realized by customizing the interface of the shuttle box.

---

```vue

<template>
  <a-transfer :data="transferData" :default-value="value">
    <template #source="{data,selectedKeys,onSelect}">
      <a-tree
        :checkable="true"
        checked-strategy="child"
        :checked-keys="selectedKeys"
        :data="getTreeData(data)"
        @check="onSelect"
      />
    </template>
  </a-transfer>
</template>

<script>
export default {
  setup() {
    const treeData = [
      {
        title: 'Trunk 0-0',
        key: '0-0',
        children: [
          {
            title: 'Leaf 0-0-1',
            key: '0-0-1',
          },
          {
            title: 'Branch 0-0-2',
            key: '0-0-2',
            children: [
              {
                title: 'Leaf 0-0-2-1',
                key: '0-0-2-1'
              },
              {
                title: 'Leaf 0-0-2-2',
                key: '0-0-2-2',
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
                title: 'Leaf 0-1-1-1',
                key: '0-1-1-1',
              },
              {
                title: 'Leaf 0-1-1-2',
                key: '0-1-1-2',
              },
            ]
          },
          {
            title: 'Leaf 0-1-2',
            key: '0-1-2',
          },
        ],
      },
    ];

    const getTransferData = (treeData = [], transferDataSource = []) => {
      treeData.forEach((item) => {
        if (item.children) getTransferData(item.children, transferDataSource);
        else transferDataSource.push({label: item.title, value: item.key});
      });
      return transferDataSource;
    };

    const getTreeData = (data = []) => {
      const values = data.map(item => item.value)

      const travel = (_treeData = []) => {
        const treeDataSource = []
        _treeData.forEach((item) => {
          if (item.children || values.includes(item.key)) {
            treeDataSource.push({title: item.title, key: item.key, children: travel(item.children)})
          }
        });
        return treeDataSource
      }

      return travel(treeData)
    }

    const transferData = getTransferData(treeData);


    const value = ['0-0-2-1'];

    return {
      transferData,
      value,
      getTreeData
    }
  },
}
</script>
```
