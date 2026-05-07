<template>
  <sd-space>
    <sd-color-picker v-model="value" size="mini">
      <sd-tag :color="value" class="color-picker-trigger-tag">
        <template #icon>
          <span class="color-picker-trigger-tag__contrast">
            <icon-bg-colors />
          </span>
        </template>
        <span class="color-picker-trigger-tag__contrast">{{ value }}</span>
      </sd-tag>
    </sd-color-picker>
  </sd-space>
</template>

<script setup>
  import { ref } from 'vue';

  const value = ref('#165DFF');
</script>

<style>
  .color-picker-trigger-tag__contrast {
    color: #fff;
    mix-blend-mode: difference;
    user-select: none;
  }
</style>
