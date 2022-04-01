```yaml
title:
  zh-CN: 表单布局
  en-US: Form Layout
```

## zh-CN

表单支持三种布局方式： `horizontal` - 水平排列 **（默认）**， `vertical` - 垂直排列， `inline` - 行内排列。

---

## en-US

The form supports three layout methods: `horizontal`, `vertical` and `inline`.

---

```vue
<template>
  <a-space direction="vertical" size="large" :style="{width: '600px'}">
    <a-radio-group v-model="layout" type="button">
      <a-radio value="horizontal">horizontal</a-radio>
      <a-radio value="vertical">vertical</a-radio>
      <a-radio value="inline">inline</a-radio>
    </a-radio-group>
    <a-form :model="form" :layout="layout">
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
    <div>
      {{ form }}
    </div>
  </a-space>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const layout = ref('horizontal')
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    })

    return {
      layout,
      form,
    }
  },
}
</script>
```
