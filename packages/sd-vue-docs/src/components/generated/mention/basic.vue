<template>
  <sd-space direction="vertical" size="large" class="sd:w-full">
    <sd-mention
      v-model="value"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      placeholder="enter something"
    />
    <sd-mention
      v-model="text"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="enter something"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref('');
  const text = ref('');
</script>
