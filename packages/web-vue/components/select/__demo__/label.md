```yaml
title:
  zh-CN: 自定义选择框展示内容
  en-US: Label
```

## zh-CN

通过 `#label` 插槽可以自定义选择框展示内容。

---

## en-US

The display content of the select box can be customized through the `#label` slot.

---

```vue
<template>
  <a-select default-value="Beijing" :style="{width:'320px'}" placeholder="Please select ...">
    <template #label="{ data }">
      <span><icon-plus/>{{data?.label}}</span>
    </template>
    <a-option>Beijing</a-option>
    <a-option>Shanghai</a-option>
    <a-option>Guangzhou</a-option>
    <a-option disabled>Disabled</a-option>
  </a-select>
</template>

<script>
import { IconPlus } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconPlus }
};
</script>
```
