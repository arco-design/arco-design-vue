<template>
  <sd-space direction="vertical" size="large">
    <sd-form :model="data" layout="inline">
      <sd-form-item label="Step" field="step">
        <sd-input-number class="sd:w-25" v-model="data.step" />
      </sd-form-item>
      <sd-form-item label="Show steps" field="showTicks">
        <sd-switch v-model="data.showTicks" />
      </sd-form-item>
    </sd-form>
    <sd-slider :default-value="20" class="sd:w-75" :step="data.step" :show-ticks="data.showTicks" />
  </sd-space>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const data = reactive({
    step: 5,
    showTicks: true,
  });
</script>
