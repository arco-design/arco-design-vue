<template>
  <sd-result status="error" title="No internet ">
    <template #icon>
      <IconFaceFrownFill />
    </template>
    <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

    <template #extra>
      <sd-button type="primary">Refresh</sd-button>
    </template>
    <sd-typography
      class="sd:p-6"
      :style="{ backgroundColor: `var(${getCssVarToken('--color-fill-2')})` }"
    >
      <sd-typography-paragraph>Try:</sd-typography-paragraph>
      <ul>
        <li> Checking the network cables, modem, and router </li>
        <li> Reconnecting to Wi-Fi </li>
      </ul>
    </sd-typography>
  </sd-result>
</template>

<script setup lang="ts">
  import { getCssVarToken } from '@sdata/web-vue';
  import { IconFaceFrownFill } from '@sdata/web-vue/es/icon/index.js';
</script>
