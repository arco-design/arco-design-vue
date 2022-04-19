```yaml
title:
  zh-CN: 子树懒加载
  en-US: Lazy Load
```

## zh-CN

通过 `load-more` 属性可以开启子树懒加载功能。
开启子树懒加载功能后，需要在无子树节点标注 `isLeaf: true`，没有标注且没有 `children` 属性的节点会认为需要子树懒加载处理。
`load-more` 属性有提供 `done` 函数进行回调，可以在回调中传入懒加载的子树。如果 `done` 函数没有传入数据会认为懒加载失败，此节点可以再次触发懒加载。

---

## en-US

The loading function of sub-slacks can be turned on through the `load-more` property.
After the child slot loading function is enabled, you need to mark `isLeaf: true` on nodes without subtrees. Nodes that are not marked and have no `children` attribute will be considered to need child slot loading processing.
The `load-more` attribute provides a `done` function for callbacks, and lazy loaded subtrees can be passed in the callback. If the `done` function does not pass in data, it will be considered as a lazy loading failure, and this node can trigger lazy loading again.

---

```vue

<template>
  <a-table :columns="columns" :data="data" :load-more="loadMore" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Salary',
      dataIndex: 'salary',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [{
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
      }, {
        key: '5',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        isLeaf: true,
      }]
    }, {
      key: '6',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    }, {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
      isLeaf: true,
    }, {
      key: '8',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
      isLeaf: true,
    }, {
      key: '9',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      isLeaf: true,
    }])

    const loadMore = (record, done) => {
      window.setTimeout(() => {
        done([
          {
            key: `${record.key}-1`,
            name: 'Ed Hellen',
            salary: 17000,
            address: '42 Park Road, London',
            email: 'ed.hellen@example.com',
            isLeaf: true,
          }, {
            key: `${record.key}-2`,
            name: 'William Smith',
            salary: 27000,
            address: '62 Park Road, London',
            email: 'william.smith@example.com',
            isLeaf: true,
          }
        ])
      }, 2000)
    }

    return {
      columns,
      data,
      loadMore
    }
  },
}
</script>
```
