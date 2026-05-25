<template>
  <QrCode :value="'https://sd.design/vue'" error-level="H" icon="https://sd.design/favicon.ico" />
</template>

<script setup>
  import { QrCode } from '@sdata/web-vue';
</script>
