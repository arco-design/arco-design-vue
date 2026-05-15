<template>
  <sd-select class="sd:w-80" v-model="value" placeholder="Please select ..." allow-clear>
    <sd-option>Beijing</sd-option>
    <sd-option>Shanghai</sd-option>
    <sd-option>Guangzhou</sd-option>
    <sd-option disabled>Disabled</sd-option>
  </sd-select>
</template>

<script setup lang="ts">
  import type { Size } from '@sdata/web-vue';

  import { ref } from 'vue';

  const value = ref('Shanghai');
</script>
