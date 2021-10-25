```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

表单的基本用法。

---

## en-US

Basic usage of the form.

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}">
    <a-form-item field="name" label="Username">
      <a-input v-model="form.name" placeholder="please enter your username..." />
      <template #help>
        <div>help message</div>
      </template>
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
      <a-button>Submit</a-button>
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
      }
    }
  },
}
</script>
```
