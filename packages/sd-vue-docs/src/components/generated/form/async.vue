<template>
  <sd-form ref="formRef" :model="form" class="sd:w-150">
    <sd-form-item field="name" label="Username" :rules="rules">
      <sd-input v-model="form.name" placeholder="please enter your username..." />
    </sd-form-item>
    <sd-form-item field="post" label="Post">
      <sd-input v-model="form.post" placeholder="please enter your post..." />
    </sd-form-item>
    <sd-form-item field="isRead">
      <sd-checkbox v-model="form.isRead"> I have read the manual </sd-checkbox>
    </sd-form-item>
    <sd-form-item>
      <sd-button @click="handleClick">Set Status</sd-button>
    </sd-form-item>
  </sd-form>
  {{ form }}
</template>

<script setup lang="ts">
  import type { FieldRule, FormInstance } from '@sdata/web-vue';

  import { reactive, ref } from 'vue';

  const formRef = ref<FormInstance | null>(null);
  const form = reactive({
    name: '',
    post: '',
    isRead: false,
  });
  const rules: FieldRule[] = [
    {
      validator: (value: unknown, cb: (error?: string) => void) => {
        return new Promise<void>((resolve) => {
          window.setTimeout(() => {
            if (value !== 'admin') {
              cb('name must be admin');
            }
            resolve();
          }, 2000);
        });
      },
    },
  ];
  const handleClick = () => {
    formRef.value?.setFields({
      name: {
        status: 'error',
        message: 'async name error',
      },
      post: {
        status: 'error',
        message: 'valid post',
      },
    });
  };
</script>
