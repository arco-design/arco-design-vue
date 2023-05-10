```yaml
title:
  zh-CN: 空元素
  en-US: renderEmpty
```

## zh-CN

通过 `renderEmpty` 可以定义组件内显示的空元素。

---

## en-US

Use `renderEmpty` to define the empty elements displayed in the component.

---

```vue
<template>
  <a-config-provider :renderEmpty="renderEmpty">
    <a-space direction="vertical" fill>
      <a-cascader :options="[]" placeholder="cascader" allow-search/>
      <a-select  placeholder="select"/>
      <a-tree-select placeholder="tree-select"/>
      <a-list>
        <template #header>
          Empty List
        </template>
      </a-list>
      <a-table :columns="columns" :data="[]" />
    </a-space>
  </a-config-provider>
</template>

<script>
import { h } from 'vue';
import { IconTrophy } from '@arco-design/web-vue/es/icon';
import { Empty } from '@arco-design/web-vue'

export default {
  components: {
    IconTrophy,
    Empty
  },
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ];
    const renderEmpty = (componentName) => {
        switch (componentName) {
          case 'cascader':
            return h(Empty, {description: 'cascader no data!'}); 
          case 'select':
            return h(Empty, {description: 'select no data!'}); 
          case 'tree-select':
            return h(Empty, {description: 'tree-select no data!'}); 
          case 'list':
            return h(Empty, {description: 'list no data!'});
          case 'table':
            return h('div', {class: 'my-empty'}, h(IconTrophy));
          default:
            return h(Empty);
        }
      };
    return {
      columns,
      renderEmpty
    }
  }
}
</script>

<style>
.my-empty {
  padding: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
</style>
```
