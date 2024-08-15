```yaml
title:
  zh-CN: 触发器
  en-US: Trigger
```

## zh-CN

可以通过 `trigger-props` 设置触发器的所有属性。

---

## en-US

You can set the properties of the trigger through `trigger-props`.

---

```vue
<template>
  <a-space direction="vertical">
    <a-switch v-model="triggerProps.popupVisible">
      <template #checked> ON </template>
      <template #unchecked>OFF</template>
    </a-switch>
    <a-color-picker defaultValue="#165DFF" :trigger-props="triggerProps" />
  </a-space>
</template>

<script setup>
import { ref } from 'vue';

const triggerProps = ref({
  popupVisible: false,
  unmountOnClose: true,
  renderToBody: false,
  position: 'rt'
})
</script>
```
