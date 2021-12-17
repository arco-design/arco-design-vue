```yaml
title:
  zh-CN: 异步关闭
  en-US: Async Close
```

## zh-CN

可以通过 on-before-ok 更简洁的实现异步关闭功能

---

## en-US

$END$

---

```vue
<template>
  <a-popconfirm @before-ok="handleBeforeOk">
    <a-button>Click To Show</a-button>
    <template #content>
      <a-form>
        <a-form-item label="Name">
          <a-input/>
        </a-form-item>
        <a-form-item label="Post">
          <a-input/>
        </a-form-item>
      </a-form>
    </template>
  </a-popconfirm>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)

const handleClick = () => {
  visible.value = true;
}

const handleBeforeOk = (done) => {
  window.setTimeout(() => {
    done()
  }, 3000)
}

const handleCancel = () => {
  visible.value = false;
}
</script>
```
