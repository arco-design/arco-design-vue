```yaml
title:
  zh-CN: 固定状态改变回调
  en-US: Callback
```

## zh-CN

当固定状态发生改变时，会触发事件。

---

## en-US

Callback when the fixed state changes.

---

```vue
<template>
  <a-affix :offsetBottom="80" @change="handleChange">
    <a-button type="primary">80px to affix bottom</a-button>
  </a-affix>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue';

const handleChange = (fixed) => {
  console.log(`${fixed}`);
};
</script>
```
