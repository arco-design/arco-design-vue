```yaml
title:
  zh-CN: 范围选择
  en-US: Range Slider
```

## zh-CN

通过设置 `range` 可开启范围选择，此时 `modelValue` 为数组。

---

## en-US

Range selection can be turned on by setting `range`, at this time `modelValue` is an array.

---

```vue
<template>
  <a-slider v-model="value" :style="{ width: '300px' }" range />
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const value = ref([5, 10]);

    return {
      value
    }

  }
}
</script>
```
