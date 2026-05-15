<template>
  <sd-button @click="handleClick">Info Message</sd-button>
</template>

<script setup lang="ts">
  import { Message } from '@sdata/web-vue';

  function handleClick() {
    Message.info('This is an info message');
  }
</script>
