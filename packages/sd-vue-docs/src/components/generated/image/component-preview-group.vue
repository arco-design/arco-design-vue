<template>
  <sd-button type="primary" @click="onClick">Click me to preview multiple image</sd-button>
  <sd-image-preview-group
    v-model:visible="visible"
    v-model:current="current"
    infinite
    :srcList="[
      'https://picsum.photos/id/10/1200/480',
      'https://picsum.photos/id/10/1200/480',
      'https://picsum.photos/id/10/1200/480',
      'https://picsum.photos/id/10/1200/480',
    ]"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const visible = ref(false);
  const current = ref(3);
  const onClick = () => {
    visible.value = true;
  };
</script>
