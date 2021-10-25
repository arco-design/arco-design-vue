```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

---

## en-US

Click the trigger button to slide out the drawer from the right, click the mask area to close.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-drawer :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleClick() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
```
