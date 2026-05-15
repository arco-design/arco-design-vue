<template>
  <sd-button @click="handleClick">Info Message</sd-button>
</template>

<script setup lang="ts">
  function handleClick() {
    this.$message.info('This is an info message');
  }
</script>
