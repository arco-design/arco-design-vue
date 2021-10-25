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
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
  </a-modal>
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
    handleClick2(){
      this.$modal({});
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
