<template>
  <sd-button @click="handleClick">Update Info Message</sd-button>
</template>

<script setup lang="ts">
  import { shallowRef } from 'vue';

  const index = shallowRef(0);

  function handleClick() {
    this.$message.info({
      id: 'myInfo',
      content: `This is an info message ${this.$data.index++}`,
      duration: 2000,
    });
  }
</script>
