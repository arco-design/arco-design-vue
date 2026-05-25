<template>
  <div class="sd:flex sd:flex-col sd:items-center sd:gap-4">
    <QrCode :value="text || '-'" />
    <Input v-model="text" class="sd:w-80" placeholder="请输入二维码内容" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  import { Input, QrCode } from '@sdata/web-vue';

  const text = ref('https://sd.design/vue');
</script>
