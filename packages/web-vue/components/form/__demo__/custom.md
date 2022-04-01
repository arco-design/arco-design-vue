```yaml
title:
  zh-CN: 自定义表单组件
  en-US: Custom Form Item
```

## zh-CN

通过 `useFormItem` 自定义表单组件。2.18.0 版本后可用。

---

## en-US

Customize form components with `useFormItem`. Available since version 2.18.0.

---

```vue
<template>
  <a-space style="margin-bottom: 20px;">
    <a-switch v-model="disabled" />
    Disabled: {{disabled}}
  </a-space>
  <Form :model="form" :disabled="disabled" :style="{width:'600px'}">
    <FormItem field="name" label="Username"
              :rules="[{required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}]">
      <MyInput v-model="form.name" placeholder="please enter your username..." />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { h, reactive, ref } from 'vue';
import { Form, FormItem, useFormItem } from '@arco-design/web-vue';

const MyInput = {
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const { mergedDisabled, eventHandlers } = useFormItem();
    const handleInput = (ev) => {
      const { value } = ev.target;
      emit('update:modelValue', value)
      eventHandlers.value?.onChange?.(ev)
    }
    return () => h('input', { disabled: mergedDisabled.value, onInput: handleInput })
  }
}

export default {
  components: {
    Form,
    FormItem,
    MyInput
  },
  setup() {
    const disabled = ref(false);
    const form = reactive({
      name: ''
    })

    return {
      disabled,
      form
    }
  },
}
</script>
```
