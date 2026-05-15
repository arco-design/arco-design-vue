<template>
  <sd-row :gutter="[40, 20]">
    <sd-col :span="12">
      <sd-alert>This is an info alert.</sd-alert>
    </sd-col>
    <sd-col :span="12">
      <sd-alert type="success">This is an success alert.</sd-alert>
    </sd-col>
    <sd-col :span="12">
      <sd-alert type="warning">This is an warning alert.</sd-alert>
    </sd-col>
    <sd-col :span="12">
      <sd-alert type="error">This is an error alert.</sd-alert>
    </sd-col>
    <sd-col :span="12">
      <sd-alert type="normal">
        <template #icon>
          <icon-exclamation-circle-fill />
        </template>
        This is an normal alert.
      </sd-alert>
    </sd-col>
  </sd-row>
</template>

<script setup lang="ts">
  import { IconExclamationCircleFill } from '@sdata/web-vue/es/icon/index.js';
</script>
