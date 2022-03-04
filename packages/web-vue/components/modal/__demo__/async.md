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
  <a-modal v-model:visible="visible" @cancel="handleCancel" @before-ok="handleBeforeOk" unmountOnClose>
    <template #title>
      Title
    </template>
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = true;
    },
    handleBeforeOk(done) {
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    },
    handleCancel() {
      this.visible = false;
    }
  }
}
</script>
```
