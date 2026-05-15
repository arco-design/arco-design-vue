<template>
  <sd-button @click="handleClick">Update Info Message</sd-button>
</template>

<script setup lang="ts">
  import { shallowRef } from 'vue';

  import { Message } from '@sdata/web-vue';

  const index = shallowRef(0);

  function handleClick() {
    Message.info({
      id: 'myInfo',
      content: `This is an info message ${index.value++}`,
      duration: 2000,
    });
  }
</script>
