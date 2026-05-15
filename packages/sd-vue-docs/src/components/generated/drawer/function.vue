<template>
  <sd-button type="primary" @click="handleClick">Open Drawer</sd-button>
</template>

<script setup lang="ts">
  import { Drawer } from '@sdata/web-vue';

  const handleClick = () => {
    Drawer.open({
      title: 'Info Title',
      content: 'This is an info message',
      width: 340,
    });
  };
</script>
