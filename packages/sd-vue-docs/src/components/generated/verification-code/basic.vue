<template>
  <sd-verification-code v-model="value" class="sd:w-75" @finish="onFinish" />
</template>

<script setup>
  import { ref } from 'vue';

  import { Message } from '@sdata/web-vue';

  const value = ref('654321');
  const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
