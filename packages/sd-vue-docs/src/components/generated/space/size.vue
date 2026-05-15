<template>
  <div>
    <div class="sd:mb-5">
      <sd-radio-group v-model="size" type="button">
        <sd-radio value="mini">mini</sd-radio>
        <sd-radio value="small">small</sd-radio>
        <sd-radio value="medium">medium</sd-radio>
        <sd-radio value="large">large</sd-radio>
      </sd-radio-group>
    </div>
    <sd-space :size="size">
      <sd-button type="primary">Item1</sd-button>
      <sd-button type="primary">Item2</sd-button>
      <sd-button type="primary">Item3</sd-button>
    </sd-space>
  </div>
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const size = shallowRef<'mini' | 'small' | 'medium' | 'large'>('medium');
</script>
