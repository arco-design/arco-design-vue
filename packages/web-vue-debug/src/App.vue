<script setup lang="ts">
  import { shallowRef } from 'vue';

  import ColorPicker from '@web-vue-src/color-picker';

  const colorModes: 'linear-gradient'[] = ['linear-gradient'];
  const colorValue = shallowRef(
    'linear-gradient(90deg, rgba(0, 82, 217, 1) 0%, rgba(255, 255, 255, 1) 100%)',
  );
  const lastTrigger = shallowRef('init');

  function handleChange(value: string, context: { trigger: string }) {
    colorValue.value = value;
    lastTrigger.value = context.trigger;
  }
</script>

<template>
  <main>
    <ColorPicker
      v-model="colorValue"
      hide-trigger
      enable-alpha
      enable-multiple-gradient
      :color-modes="colorModes"
      @change="handleChange"
    />
  </main>
</template>
