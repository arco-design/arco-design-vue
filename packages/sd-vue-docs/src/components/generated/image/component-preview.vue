<template>
  <sd-button type="primary" @click="onClick">Click me to preview image</sd-button>
  <sd-image-preview
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    v-model:visible="visible"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const visible = ref(false);
  const onClick = () => {
    visible.value = true;
  };
</script>
