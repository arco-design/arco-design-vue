```yaml
title:
  zh-CN: 虚拟列表
  en-US: Virtual List
```

## zh-CN

$END$

---

## en-US

$END$

---

```vue
<template>
  <a-transfer :data="list" :virtual-list-props="{}" />
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const list = reactive(Array(10000).fill(null).map((_, index) => {
      return {
        value: index,
        label: `0000${index}`.slice(-5),
      };
    }))

    return {
      list
    }
  },
}
</script>
```
