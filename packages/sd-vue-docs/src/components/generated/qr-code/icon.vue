<template>
  <QrCode
    :value="'https://sd-design.js.org'"
    error-level="H"
    icon="https://sd-design.js.org/logo-icon.png"
  />
</template>

<script setup>
  import { QrCode } from '@sdata/web-vue';
</script>
