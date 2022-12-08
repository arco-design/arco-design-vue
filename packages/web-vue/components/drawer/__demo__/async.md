```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```

## zh-CN

$END$

---

## en-US

$END$

---

```vue
<template>
  <a-button @click="handleClick">Open Drawer</a-button>
  <a-drawer v-model:visible="visible" @before-ok="handleBeforeOk" @cancel="handleCancel" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-drawer>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)

const handleClick = () => {
  visible.value = true;
}

const handleBeforeOk = (done) => {
  window.setTimeout(() => {
    done()
  }, 3000)
}

const handleCancel = () => {
  visible.value = false;
}
</script>
```
