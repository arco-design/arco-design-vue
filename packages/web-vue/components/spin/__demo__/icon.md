```yaml
title:
  zh-CN: 自定义元素
  en-US: Custom element
```

## zh-CN

通过 `#element` 插槽可设置自定义元素，`#icon` 插槽可以自定义图标（有旋转效果）。

---

## en-US

Custom elements can be set through the `# element` slot, and the icon can be customized (with rotation effect) in the `# icon` slot.

---

```vue
<template>
  <a-row :gutter="20">
    <a-col :span="12">
      <a-spin block loading>
        <template #element>
          <icon-sync />
        </template>
        <a-alert title="Success" type="success">This is an success alert.</a-alert>
      </a-spin>
    </a-col>
    <a-col :span="12">
      <a-spin block loading>
        <template #icon>
          <icon-sync />
        </template>
        <a-alert title="Info">This is an info alert.</a-alert>
      </a-spin>
    </a-col>
  </a-row>
</template>

<script>
import { IconSync } from '@arco-design/web-vue/es/icon';

export default {
  components: { IconSync }
};
</script>
```
