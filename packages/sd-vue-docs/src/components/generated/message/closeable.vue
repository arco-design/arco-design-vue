<template>
  <sd-button @click="handleClick">Closeable Message</sd-button>
</template>

<script setup lang="ts">
  import { Message } from '@sdata/web-vue';

  function handleClick() {
    Message.info({
      content: 'This is an info message!',
      closable: true,
    });
  }
</script>
