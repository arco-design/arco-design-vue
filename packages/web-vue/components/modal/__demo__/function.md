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
import { h } from 'vue';
import { Modal, Button } from '@arco-design/web-vue';

const ModalContent = {
  setup() {
    const onClick = () => {
      Modal.info({
        title: 'Info Title',
        content: 'This is an nest info message'
      });
    };

    return () => h('div', {class: 'info-modal-content'}, [
      h('span', {style: 'margin-bottom: 10px;'}, 'This is an info message'),
      h(Button, {size: 'mini', onClick}, 'Open Nest Modal')
    ])
  },
}

export default {
  setup() {
    const handleClick = () => {
      Modal.info({
        title: 'Info Title',
        content: () => h(ModalContent)
      });
    };

    return {
      handleClick
    }
  },
}
</script>

<style>
.info-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```
