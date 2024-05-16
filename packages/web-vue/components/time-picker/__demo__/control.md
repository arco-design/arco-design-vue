```yaml
title:
  zh-CN: 双向绑定
  en-US: Two-way binding
```

## zh-CN

支持 `v-model` 进行数据的双向绑定。

---

## en-US

Support `v-model` for two-way data binding.

---

```vue
<template>
  <a-time-picker
    style="width: 194px"
    v-model="value"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>
```
