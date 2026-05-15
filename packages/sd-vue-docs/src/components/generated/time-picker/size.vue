<template>
  <div class="sd:mb-5">
    <sd-radio-group v-model="size" type="button">
      <sd-radio value="mini">mini</sd-radio>
      <sd-radio value="small">small</sd-radio>
      <sd-radio value="medium">medium</sd-radio>
      <sd-radio value="large">large</sd-radio>
    </sd-radio-group>
  </div>
  <sd-time-picker class="sd:w-48.5" :size="size" />
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const size = shallowRef('small');
</script>
