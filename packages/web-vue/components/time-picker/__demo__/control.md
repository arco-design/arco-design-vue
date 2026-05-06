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
  <a-time-picker style="width: 194px" v-model="value" />
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  value: null,
});

const { value } = toRefs(state);
</script>
```
