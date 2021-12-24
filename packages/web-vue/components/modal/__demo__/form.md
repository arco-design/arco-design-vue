```yaml
title:
  zh-CN: 弹出层表单
  en-US: Modal Form
```

## zh-CN

$END$

---

## en-US

$END$

---

```vue
<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk" unmountOnClose>
    <a-form :model="form">
      <a-form-item field="name" label="Name">
        <a-input v-model="form.name"/>
      </a-form-item>
      <a-form-item field="post" label="Post">
        <a-select v-model="form.post">
          <a-option>123</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref,reactive } from 'vue';

const form=ref({
  name:'',
  post:''
})

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
