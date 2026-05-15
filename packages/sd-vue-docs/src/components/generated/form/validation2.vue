<template>
  <sd-form ref="formRef" :rules="rules" :model="form" class="sd:w-150" @submit="handleSubmit">
    <sd-form-item field="name" label="Username" validate-trigger="blur">
      <sd-input v-model="form.name" placeholder="please enter your username..." />
    </sd-form-item>
    <sd-form-item field="password" label="密码" validate-trigger="blur">
      <sd-input-password v-model="form.password" placeholder="please enter your password..." />
    </sd-form-item>
    <sd-form-item field="password2" label="确认密码" validate-trigger="blur">
      <sd-input-password v-model="form.password2" placeholder="please confirm your password..." />
    </sd-form-item>
    <sd-form-item field="email" label="email">
      <sd-input v-model="form.email" placeholder="please enter your email..." />
    </sd-form-item>
    <sd-form-item field="ip" label="IP">
      <sd-input v-model="form.ip" placeholder="please enter your ip..." />
    </sd-form-item>
    <sd-form-item field="url" label="URL">
      <sd-input v-model="form.url" placeholder="please enter your url..." />
    </sd-form-item>
    <sd-form-item field="match" label="match">
      <sd-input v-model="form.match" placeholder="please enter your match..." />
    </sd-form-item>
    <sd-form-item>
      <sd-space>
        <sd-button html-type="submit">Submit</sd-button>
        <sd-button @click="formRef?.resetFields()">Reset</sd-button>
      </sd-space>
    </sd-form-item>
  </sd-form>
  {{ form }}
</template>

<script setup lang="ts">
  import type {
    FieldRule,
    FormInstance,
    Size,
    ValidateStatus,
    ValidatedError,
  } from '@sdata/web-vue';

  import { reactive, ref } from 'vue';

  const handleSubmit = ({
    values,
    errors,
  }: {
    values: Record<string, unknown>;
    errors: Record<string, ValidatedError> | undefined;
  }) => {
    console.log('values:', values, '\nerrors:', errors);
  };

  const form = reactive({
    name: '',
    password: '',
    password2: '',
    email: '',
    ip: '192.168.2.1',
    url: '',
    match: '',
  });

  const rules: Record<string, FieldRule[]> = {
    name: [
      {
        required: true,
        message: 'name is required',
      },
    ],
    password: [
      {
        required: true,
        message: 'password is required',
      },
    ],
    password2: [
      {
        required: true,
        message: 'password is required',
      },
      {
        validator: (value: unknown, cb: (error?: string) => void) => {
          if (value !== form.password) {
            cb('two passwords do not match');
          } else {
            cb();
          }
        },
      },
    ],
    email: [
      {
        type: 'email',
        required: true,
      },
    ],
    ip: [
      {
        type: 'ip',
        required: true,
      },
    ],
    url: [
      {
        type: 'url',
        required: true,
      },
    ],
    match: [
      {
        required: true,
        validator: (value: unknown, cb: (error?: string) => void) => {
          return new Promise<void>((resolve) => {
            if (!value) {
              cb('Please enter match');
            }
            if (value !== 'match') {
              cb('match must be match!');
            }
            resolve();
          });
        },
      },
    ],
  };

  const formRef = ref<FormInstance | null>(null);
</script>
