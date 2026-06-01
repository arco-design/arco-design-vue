<template>
  <div class="sd:flex sd:flex-wrap sd:gap-6">
    <sd-qr-code :value="value" status="loading" :spin-props="{ size: 10, dot: true }" />
    <sd-qr-code :value="value" status="expired" @refresh="onRefresh" />
    <sd-qr-code :value="value" status="scanned" />
  </div>
</template>

<script setup>
  import { Message } from '@sdata/web-vue';

  const value = 'https://sd-design.js.org';

  const onRefresh = () => {
    Message.info('已触发刷新事件');
  };
</script>
