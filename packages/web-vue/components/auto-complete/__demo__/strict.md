```yaml
title:
  zh-CN: 区分大小写
  en-US: Strict
```

## zh-CN

使用 `strict` 属性来指明在匹配时严格区分大小写。

---

## en-US

Use the `strict` attribute to specify that the matching is strictly case sensitive.

---

```vue
<template>
  <a-auto-complete
    :data="data"
    :style="{ width: '360px' }"
    placeholder="please enter something"
    strict
  />
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  data: ['Beijing', 'Shanghai', 'Chengdu', 'WuHan'],
});

const { data } = toRefs(state);
</script>
```
