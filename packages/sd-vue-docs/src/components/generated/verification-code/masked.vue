<template>
  <sd-verification-code defaultValue="123" class="sd:w-75" masked @finish="onFinish" />
</template>

<script setup>
  import { Message } from '@sdata/web-vue';

  const onFinish = (value) => Message.info(`Verification code: ${value}`);
</script>
