```yaml
title:
  zh-CN: 按钮形状
  en-US: Button Shape
```

## zh-CN

按钮分为 `square` - **长方形（默认）**、`circle` - **圆形**、`round` - **全圆角**三种形状。

---

## en-US

Button is divided into three shapes: `square` - **rectangular (default)**, `circle` - **circle**, and `round` - **full rounded corner**.

---

```vue
<template>
  <a-space>
    <a-button type="primary">Square</a-button>
    <a-button type="primary" shape="round">Round</a-button>
    <a-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
    <a-button type="primary" shape="circle">
      <icon-plus />
    </a-button>
  </a-space>
</template>
<script>
import { IconPlus } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconPlus }
};
</script>
```
