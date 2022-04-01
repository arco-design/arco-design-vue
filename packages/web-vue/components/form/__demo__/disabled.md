```yaml
title:
  zh-CN: 全局禁用
  en-US: Global Disabled
```

## zh-CN

通过 `disabled` 属性可以禁用整个表单。

---

## en-US

The entire form can be disabled through the `disabled` attribute.

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}" disabled>
    <a-form-item field="name" label="Username">
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
      <a-button>Submit</a-button>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    })

    return {
      form,
    }
  },
}
</script>
```
