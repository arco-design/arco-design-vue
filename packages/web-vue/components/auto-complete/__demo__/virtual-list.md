```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

虚拟列表的使用方法。

---

## en-US

How to use the virtual list.

---

```vue
<template>
  <a-auto-complete
    :data="data"
    @search="handleSearch"
    :style="{ width: '360px' }"
    placeholder="please enter something"
    :virtual-list-props="{ height: 200, threshold: 20 }"
  />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);

const handleSearch = (value) => {
  if (value) {
    data.value = [...Array(5000)].map((_, index) => `${value}-${index}`);
  } else {
    data.value = [];
  }
};
</script>
```
