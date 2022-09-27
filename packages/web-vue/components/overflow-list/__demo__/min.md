```yaml
title:
  zh-CN: 最少元素
  en-US: Least element
```

## zh-CN

当可见元素小于 `min` 时，将不再隐藏元素。

---

## en-US

When the visible element is less than `min`, the element is no longer hidden.

---

```vue
<template>
  <a-slider v-model="width" :min="0" :max="800" />
  <div :style="{ maxWidth:`${width}px`, width: '100%', marginTop: '20px'}">
    <a-overflow-list :min="4">
      <a-tag color="arcoblue" v-for="item of tags" :key="item">Tag{{item}}</a-tag>
    </a-overflow-list>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  setup() {
    const width = ref(500);
    const tags = computed(() => Array.from({ length: 20 }, (_, idx) => idx + 1));

    return {
      width,
      tags
    }
  }
}
</script>
```
