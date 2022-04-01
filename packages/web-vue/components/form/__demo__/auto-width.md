```yaml
title:
  zh-CN: 自动标签宽度
  en-US: Auto Label Width
```

## zh-CN

设置 `auto-label-width` 开启自动标签宽度。仅在 `layout="horizontal"` 布局下生效。
_* 目前仅在首次加载后生效。_

---

## en-US

Set `auto-label-width` to enable automatic label width. It only takes effect under the layout of `layout="horizontal"`.
_* Currently it only takes effect after the first load._

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}" auto-label-width @submit="handleSubmit">
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
      <a-button html-type="submit">Submit</a-button>
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
    const handleSubmit = (data) => {
      console.log(data)
    }

    return {
      form,
      handleSubmit
    }
  },
}
</script>
```
