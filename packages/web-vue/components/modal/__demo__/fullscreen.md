```yaml
title:
  zh-CN: 全屏
  en-US: Fullscreen
```

## zh-CN

开启 `fullscreen` 属性，可以让对话框占满整个容器。

---

## en-US

Enable the `fullscreen` property to make the dialog fill the entire container.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" fullscreen>
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
