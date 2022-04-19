```yaml
title:
  zh-CN: 函数调用
  en-US: Call By Function
```

## zh-CN

通过函数的方式使用对话框。

---

## en-US

Use the modal by function.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
</template>

<script>
import { Modal } from '@arco-design/web-vue';

export default {
  setup() {
    const handleClick = () => {
      Modal.info({
        title: 'Info Title',
        content: 'This is an info message'
      });
    };

    return {
      handleClick
    }
  },
}
</script>
```
