<template>
  <div class="sd:flex sd:flex-col sd:items-center sd:gap-4">
    <sd-qr-code :value="text || '-'" />
    <sd-input v-model="text" class="sd:w-80" placeholder="请输入二维码内容" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const text = ref('https://sd-design.js.org');
</script>
