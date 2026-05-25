<template>
  <div class="sd:flex sd:flex-wrap sd:gap-6">
    <QrCode :value="value" status="loading" />
    <QrCode :value="value" status="expired" @refresh="onRefresh" />
    <QrCode :value="value" status="scanned" />
  </div>
</template>

<script setup>
  import { Message, QrCode } from '@sdata/web-vue';

  const value = 'https://sd.design/vue';

  const onRefresh = () => {
    Message.info('已触发刷新事件');
  };
</script>
