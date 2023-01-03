```yaml
title:
  zh-CN: 定制按钮文字
  en-US: Custom Button Text
```

## zh-CN

设置 `okText` 与 `cancelText` 可以自定义按钮文字。

---

## en-US

Set `okText` and `cancelText` to customize the button text.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel" okText="Confirm" cancelText="Exit" unmountOnClose>
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
