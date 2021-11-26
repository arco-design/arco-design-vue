```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

对话框的基本用法。

---

## en-US

The basic usage of the modal.

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose @before-ok="handleBeforeOk">
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
      // this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleBeforeOk( done){
      window.setTimeout(()=>{
        done()
      },3000)

    }
  }
};
</script>
```
