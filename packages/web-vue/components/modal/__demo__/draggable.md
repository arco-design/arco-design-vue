```yaml
title:
  zh-CN: 可拖动
  en-US: Draggable
```

## zh-CN

开启 `draggable` 属性，允许用户拖动对话框。

---

## en-US

Enables the `draggable` property, which allows the user to drag the dialog.

---

```vue
<template>
  <a-button @click="handleClick">Open Draggable Modal</a-button>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" draggable>
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-modal>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
}
</script>
```
