```yaml
title:
  zh-CN: 图标按钮
  en-US: Icon Button
```

## zh-CN

按钮可以嵌入图标。在只设置图标时，按钮的宽高相等。

---

## en-US

Buttons can be embedded with icons. When only icons are set, the width and height of the buttons are equal.

---

```vue
<template>
  <a-space>
    <a-button type="primary">
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
    <a-button type="primary">
      <template #icon>
        <icon-delete />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>Delete</template>
    </a-button>
  </a-space>
</template>

<script>
import { IconPlus, IconDelete } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconPlus, IconDelete }
};
</script>
```
