```yaml
title:
  zh-CN: 确认对话框
  en-US: Confirm Modal
```

## zh-CN

使用Modal.confirm()，可以快速弹出对话框。

---

## en-US

Use Modal.confirm() to quickly pop up a confirmation modal dialog.

---

```vue
<template>
  <a-button type="primary" @click="handleClick">Confirm</a-button>
</template>

<script>
import { ref } from 'vue';
import { Modal } from '@arco-design/web-vue';

export default {
  setup() {
    const handleClick = () => {
      Modal.confirm({
        title: 'Confirm deletion',
        content: 'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
        okButtonProps: {
          status: 'danger'
        }
      })
    };

    return {
      handleClick
    }
  },
}
</script>
```
