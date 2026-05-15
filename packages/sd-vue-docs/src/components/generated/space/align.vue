<template>
  <div>
    <div class="sd:mb-5">
      <sd-radio-group v-model="align" type="button">
        <sd-radio value="start">start</sd-radio>
        <sd-radio value="center">center</sd-radio>
        <sd-radio value="end">end</sd-radio>
        <sd-radio value="baseline">baseline</sd-radio>
      </sd-radio-group>
    </div>
    <sd-space :align="align" class="sd:bg-[var(--color-fill-2)] sd:p-2.5">
      <sd-typography-text>Space:</sd-typography-text>
      <sd-button type="primary">Item2</sd-button>
      <sd-card title="Card"> Card content </sd-card>
    </sd-space>
  </div>
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const align = shallowRef<'start' | 'center' | 'end' | 'baseline'>('center');
</script>
