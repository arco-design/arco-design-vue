```yaml
title:
  zh-CN: 表单异步校验
  en-US: Asynchronous validation
```

## zh-CN

通过异步的方法校验表单功能。

---

## en-US

Verify the form function through an asynchronous method.

---

```vue

<template>
  <a-form ref="formRef" :model="form" :style="{width:'600px'}">
    <a-form-item field="name" label="Username" :rules="rules">
      <a-input v-model="form.name" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item field="post" label="Post">
      <a-input v-model="form.post" placeholder="please enter your post..." />
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead">
        I have read the manual
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button @click="handleClick">Set Status</a-button>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        post: '',
        isRead: false,
      },
      rules: [{
        validator: (value, cb) => {
          return new Promise(resolve => {
            window.setTimeout(() => {
              if (value !== 'admin') {
                cb('name must be admin')
              }
              resolve()
            }, 2000)
          })
        }
      }]
    }
  },
  methods: {
    handleClick() {
      this.$refs.formRef.setFields({
        name: {
          status: 'error',
          message: 'async name error'
        },
        post: {
          status: 'error',
          message: 'valid post'
        }
      })
    }
  }
}
</script>
```
