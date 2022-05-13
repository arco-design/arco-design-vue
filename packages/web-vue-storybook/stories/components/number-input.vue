<template>
  <div>
    <Form
      ref="formRef"
      :size="form.size"
      :model="form"
      :style="{ width: '600px' }"
      :validate-trigger="['change', 'input']"
      @submit="handleSubmit"
    >
      <FormItem
        field="name"
        label="Username"
        :rules="[
          { required: true, message: 'name is required' },
          { minLength: 5, message: 'must be greater than 5 characters' },
          { validator: testValidator('text') },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <Input
          v-model="form.name"
          placeholder="please enter your username..."
        />
      </FormItem>
      <FormItem
        field="age"
        label="Age"
        :validate-trigger="['change', 'input']"
        :rules="[
          { required: true, message: 'age is required' },
          { type: 'number', max: 200, message: 'age is max than 200' },
          { validator: testValidator('number') },
        ]"
      >
        <InputNumber
          v-model="form.age"
          placeholder="please enter your age..."
        />
      </FormItem>
    </Form>

    <div class="data">
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { InputNumber, Form, FormItem, Input } from '@web-vue/components';

const form = reactive({
  size: 'medium',
  name: '',
  age: null,
  section: '',
  province: 'haidian',
  options: [],
  date: '',
  radio: 'radio one',
  slider: 5,
  score: 5,
  switch: false,
  multiSelect: ['section one'],
  treeSelect: '',
});

const testValidator = (source) => {
  return (value, cb) => {
    console.log('🚀 ~ file: number-input.vue ~ line 69 ~ source', source);
    console.log('🚀 ~ file: number-input.vue ~ line 54 ~ value', value);
    cb();
  };
};

const handleSubmit = () => {
  console.log(form);
};
</script>
