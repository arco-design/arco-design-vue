<template>
  <sd-button type="primary" @click="onClick">Click me to preview image</sd-button>
  <sd-image-preview src="https://picsum.photos/id/10/1000/1000" v-model:visible="visible" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const visible = ref(false);
  const onClick = () => {
    visible.value = true;
  };
</script>
