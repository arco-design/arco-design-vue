```yaml
title:
  zh-CN: 双向绑定
  en-US: Two-way binding
```

## zh-CN

通过 `v-model` 实现值的双向绑定

---

## en-US

Support two-way binding through `v-model`

---

```vue
<template>
  <a-space>
    <a-date-picker v-model="value" style="width: 200px;" />
    <a-range-picker v-model="rangeValue" style="width: 300px;" />
  </a-space>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());
const rangeValue = ref([Date.now(), Date.now()]);
</script>
```
