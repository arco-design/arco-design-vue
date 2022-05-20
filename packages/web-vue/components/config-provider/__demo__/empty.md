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
    <template #empty>
      <div class="my-empty">
        <icon-trophy />
      </div>
    </template>
    <a-table :columns="columns" :data="[]" />
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
