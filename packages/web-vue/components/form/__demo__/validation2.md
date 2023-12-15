```yaml
title:
  zh-CN: 验证表单2
  en-US: Validation2
```

## zh-CN

展示了表单校验`rules`使用在`a-form`上的使用方法，以及可以直接校验`email`、`ip`、`url`

---

## en-US

It shows how to use form validation rules on `a-form`, and how to verify `email`, `ip`, and `url` directly

---

```vue
<template>
  <a-form ref="formRef" :rules="rules" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
    <a-form-item field="name" label="Username" validate-trigger="blur">
      <a-input v-model="form.name" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item field="password" label="密码" validate-trigger="blur">
      <a-input-password v-model="form.password" placeholder="please enter your password..." />
    </a-form-item>
    <a-form-item field="password2" label="确认密码" validate-trigger="blur">
      <a-input-password v-model="form.password2" placeholder="please confirm your password..." />
    </a-form-item>
    <a-form-item field="email" label="email">
      <a-input v-model="form.email" placeholder="please enter your email..." />
    </a-form-item>
    <a-form-item field="ip" label="IP">
      <a-input v-model="form.ip" placeholder="please enter your ip..." />
    </a-form-item>
    <a-form-item field="url" label="URL">
      <a-input v-model="form.url" placeholder="please enter your url..." />
    </a-form-item>
    <a-form-item field="match" label="match">
      <a-input v-model="form.match" placeholder="please enter your match..." />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">Submit</a-button>
        <a-button @click="$refs.formRef.resetFields()">Reset</a-button>
      </a-space>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const handleSubmit = ({values, errors}) => {
      console.log('values:', values, '\nerrors:', errors)
    }

    const form = reactive({
      name: '',
      password: '',
      password2: '',
      email: '',
      ip: '192.168.2.1',
      url: '',
      match: ''
    });

    const rules = {
      name: [
        {
          required: true,
          message:'name is required',
        },
      ],
      password: [
        {
          required: true,
          message:'password is required',
        },
      ],
      password2: [
        {
          required: true,
          message:'password is required',
        },
        {
          validator: (value, cb) => {
            if (value !== form.password) {
              cb('two passwords do not match')
            } else {
              cb()
            }
          }
        }
      ],
      email: [
        {
          type: 'email',
          required: true,
        }
      ],
      ip: [
        {
          type: 'ip',
          required: true,
        }
      ],
      url: [
        {
          type: 'url',
          required: true,
        }
      ],
      match: [
        {
          required: true,
          validator: (value, cb) => {
            return new Promise((resolve) => {
              if (!value) {
                cb('Please enter match')
              }
              if (value !== 'match') {
                cb('match must be match!')
              }
              resolve()
            })
          }
        }
      ],
    }

    return {
      form,
      rules,
      handleSubmit
    }
  },
}
</script>
```
