<template>
  <sd-form ref="formRef" :model="form" class="sd:w-75">
    <sd-form-item
      field="code"
      label="code"
      :rules="[
        { required: true, message: 'Verification code is required' },
        { minLength: 6, message: 'Verification code is incomplete' },
        { match: /^\d+$/, message: 'Must be numeric' },
      ]"
    >
      <sd-verification-code v-model="form.code" class="sd:w-75" @finish="onFinish" />
    </sd-form-item>
    <sd-form-item>
      <sd-button class="sd:w-15" type="primary" size="large" htmlType="submit">Submit</sd-button>
    </sd-form-item>
  </sd-form>
</template>

<script setup>
  import { ref } from 'vue';

  import { Message } from '@sdata/web-vue';

  const value = ref('654321');
  const formRef = ref(null);
  const form = ref({
    code: '',
  });
  const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
