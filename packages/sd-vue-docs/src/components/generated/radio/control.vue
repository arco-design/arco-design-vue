<template>
  <sd-space size="large">
    <sd-radio v-model="checked1">v-model</sd-radio>
    <sd-radio :model-value="true">binding "true"</sd-radio>
    <sd-radio :model-value="checked2">binding value2</sd-radio>
    <sd-radio :default-checked="true">uncontrolled state</sd-radio>
  </sd-space>
  <div class="sd:mt-5">
    <sd-space size="large">
      <sd-button type="primary" @click="handleSetCheck">
        {{ checked2 ? 'uncheck' : 'check' }} value2
      </sd-button>
      <sd-button @click="handleReset"> reset all </sd-button>
    </sd-space>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const checked1 = ref(false);
  const checked2 = ref(false);

  const handleSetCheck = () => {
    checked2.value = !checked2.value;
  };

  const handleReset = () => {
    checked1.value = false;
    checked2.value = false;
  };
</script>
