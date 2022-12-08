```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```

## zh-CN

可以通过 on-before-ok 更简洁的实现异步关闭功能

---

## en-US

Asynchronous shutdown can be implemented more concisely through on-before-ok

---

```vue

<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" @cancel="handleCancel" :on-before-ok="handleBeforeOk" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
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
    const handleBeforeOk = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      return true;
      // prevent close
      // return false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      handleClick,
      handleBeforeOk,
      handleCancel
    }
  },
}
</script>
```
