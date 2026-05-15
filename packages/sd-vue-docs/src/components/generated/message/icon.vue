<template>
  <sd-button @click="handleClick">Info Message</sd-button>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  import { IconFaceSmileFill } from '@sdata/web-vue/es/icon/index.js';

  function handleClick() {
    this.$message.info({
      content: 'This is an info message!',
      icon: () => h(IconFaceSmileFill),
    });
  }
</script>
