```yaml
title:
  zh-CN: 额外信息和帮助信息
  en-US: Extra Message & Help Message
```

## zh-CN

可以使用 `extra` 添加额外信息。
如果需要在外部自定义校验信息，可以使用 `help` 属性或插槽。设置 `help` 时校验信息会被屏蔽。

---

## en-US

You can use `extra` to add extra information.
You can use the `help` attribute or slot. The verification information will be blocked when `help` is set.

---

```vue
<template>
  <a-form :model="form" :style="{width:'600px'}">
    <a-form-item field="name" label="Username" required>
      <a-input v-model="form.name" placeholder="please enter your username..." />
      <template #extra>
        <div>Used to login</div>
      </template>
    </a-form-item>
    <a-form-item field="post" label="Post" required>
      <a-input v-model="form.post" placeholder="please enter your post..." />
      <template #extra>
        <div>Used to login</div>
      </template>
      <template #help>
        <div>Custom valitae message</div>
      </template>
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead">
        I have read the manual
      </a-checkbox>
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
