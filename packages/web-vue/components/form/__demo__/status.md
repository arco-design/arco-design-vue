```yaml
title:
  zh-CN: 自定义表单校验状态
  en-US: Form
```

## zh-CN

开启 `feedback` 可以让部分输入组件展示当前状态信息

---

## en-US

Enable `feedback` to allow some input components to display current state information

---

```vue
<template>
  <a-space direction="vertical" size="large">
    <a-radio-group v-model="status" type="button">
      <a-radio value="validating">validating</a-radio>
      <a-radio value="success">success</a-radio>
      <a-radio value="error">error</a-radio>
      <a-radio value="warning">warning</a-radio>
    </a-radio-group>
    <a-radio-group v-model="size" type="button">
      <a-radio value="mini">mini</a-radio>
      <a-radio value="small">small</a-radio>
      <a-radio value="medium">medium</a-radio>
      <a-radio value="large">large</a-radio>
    </a-radio-group>
  </a-space>
  <a-form
    :model="form"
    :style="{ width: '600px', marginTop: '20px' }"
    :size="size"
  >
    <a-form-item
      field="name"
      label="Username"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <a-input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </a-form-item>
    <a-form-item
      field="post"
      label="Post"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <a-input-number
        v-model="form.post"
        placeholder="please enter your post..."
      />
    </a-form-item>
    <a-form-item
      field="tags"
      label="Tags"
      help="This is custom message"
      extra="This is extra text"
      :validate-status="status"
      feedback
    >
      <a-input-tag
        v-model="form.tags"
        placeholder="please enter your post..."
      />
    </a-form-item>
    <a-form-item
      field="section"
      label="Section"
      :rules="[{ match: /section one/, message: 'must select one' }]"
      :validate-status="status"
      feedback
    >
      <a-select v-model="form.section" placeholder="Please select ...">
        <a-option value="section one">Section One</a-option>
        <a-option value="section two">Section Two</a-option>
        <a-option value="section three">Section Three</a-option>
      </a-select>
    </a-form-item>
    <a-form-item label="DateRange" :validate-status="status" feedback>
      <a-range-picker></a-range-picker>
    </a-form-item>

    <a-form-item field="date" label="Date" :validate-status="status" feedback>
      <a-date-picker></a-date-picker>
    </a-form-item>

    <a-form-item field="time" label="Time" :validate-status="status" feedback>
      <a-time-picker></a-time-picker>
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const status = ref('success');
    const size = ref('medium');
    const form = reactive({
      name: '',
      post: undefined,
      tags: ['tag1'],
      section: '',
    });

    return {
      status,
      size,
      form,
    };
  },
};
</script>
```
