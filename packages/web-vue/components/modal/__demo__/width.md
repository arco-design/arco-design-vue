```yaml
title:
  zh-CN: 对话框的宽度
  en-US: Modal width
```

## zh-CN

设置 `width="auto"` 可以让对话框自适应宽度

---

## en-US

Set `width="auto"` to make the dialog box adapt to the width

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal width="auto" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
</script>
```
