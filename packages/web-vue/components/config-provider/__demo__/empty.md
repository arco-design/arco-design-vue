```yaml
title:
  zh-CN: 自定义空状态元素
  en-US: Custom Empty Element
```

## zh-CN

通过 `empty` 插槽可以全局自定义空状态元素。

---

## en-US

Empty state elements can be customized globally via the `empty` slot.

---

```vue
<template>
  <a-config-provider>
    <template #empty="scope">
      <a-empty v-if="scope?.component==='cascader'" description="cascader no data!" in-config-provider>
      </a-empty>
      <a-empty v-else-if="scope?.component==='select'" description="select no data!" in-config-provider></a-empty>
      <a-empty v-else-if="scope?.component==='tree-select'" description="tree-select no data!" in-config-provider></a-empty>
      <a-empty v-else-if="scope?.component==='list'" description="list no data!" in-config-provider></a-empty>
      <a-empty v-else-if="scope?.component==='table'" description="table no data!" in-config-provider></a-empty>
      <div v-else class="my-empty">
        <icon-trophy />
      </div>
    </template>
    <a-space direction="vertical" fill>
      <a-cascader :options="[]" placeholder="cascader" allow-search />
      <a-select placeholder="select" allow-search />
      <a-tree-select placeholder="tree-select"/>
      <a-list>
        <template #header>
          Empty List
        </template>
      </a-list>
      <a-table :columns="columns" :data="[]" />
      <a-empty></a-empty>
    </a-space>
  </a-config-provider>
</template>

<script>
import { IconTrophy } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconTrophy
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
    return {
      columns
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
