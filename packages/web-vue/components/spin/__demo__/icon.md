```yaml
title:
  zh-CN: 自定义图标
  en-US: Custom Icon
```

## zh-CN

通过 `#icon` 插槽可以自定义图标。

---

## en-US

$END$

---

```vue
<template>
  <a-spin>
    <template #icon>
      <icon-sync />
    </template>
  </a-spin>
</template>

<script setup>
import { IconSync } from '@arco-design/web-vue/es/icon';
</script>
```
