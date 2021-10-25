```yaml
title:
  zh-CN: 嵌套抽屉
  en-US: Nested
```

## zh-CN

在抽屉内打开新的抽屉。

---

## en-US

Open a new drawer in the drawer.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-drawer :visible="visible" :width="500" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
    <a-button @click="handleNestedClick">Open Nested Modal</a-button>
  </a-drawer>
  <a-drawer :visible="nestedVisible" @ok="handleNestedOk" @cancel="handleNestedCancel" unmountOnClose>
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
      visible: false,
      nestedVisible:false,
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
    },
    handleNestedClick() {
      this.nestedVisible = true;
    },
    handleNestedOk() {
      this.nestedVisible = false;
    },
    handleNestedCancel() {
      this.nestedVisible = false;
    }
  }
};
</script>
```
