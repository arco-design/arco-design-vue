```yaml
title:
  zh-CN: 按需加载
  en-US: Tree shaking
```

## zh-CN

可以通过单独引入图标的方式实现按需加载。

---

## en-US

The on-demand import can be achieved by separately introducing icons.

---

```vue
<template>
  <a-space size="large">
    <icon-plus :style="{fontSize:'32px'}" />
    <icon-check-circle :style="{fontSize:'32px'}" />
  </a-space>
</template>

<script>
import { IconPlus, IconCheckCircle } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconPlus, IconCheckCircle }
}
</script>
```
