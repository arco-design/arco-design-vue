<template>
  <sd-spin :loading="loading" tip="This may take a while...">
    <sd-card title="SD Card">
      ByteDance's core product, Toutiao ('Headlines'), is a content platform in China and around the
      world. Toutiao started out as a news recommendation engine and gradually evolved into a
      platform delivering content in various formats.
    </sd-card>
  </sd-spin>
</template>

<script setup lang="ts">
  import { shallowRef } from 'vue';

  const loading = shallowRef(true);
</script>
