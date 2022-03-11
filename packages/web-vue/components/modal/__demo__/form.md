```yaml
title:
  zh-CN: 弹出层表单
  en-US: Modal Form
```

## zh-CN

在对话框中使用表单

---

## en-US

Using Form in Modal

---

```vue
<template>
  <a-button @click="handleClick">Open Form Modal</a-button>
  <a-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk">
    <a-form :model="form">
      <a-form-item field="name" label="Name">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="post" label="Post">
        <a-select v-model="form.post">
          <a-option value="post1">Post1</a-option>
          <a-option value="post2">Post2</a-option>
          <a-option value="post3">Post3</a-option>
          <a-option value="post4">Post4</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        name: '',
        post: ''
      },

    }
  },
  methods: {
    handleClick() {
      this.visible = true
    },
    handleBeforeOk(done) {
      console.log(this.form);
      // submit your form data
      window.setTimeout(() => {
        done()
      }, 3000)
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
```
