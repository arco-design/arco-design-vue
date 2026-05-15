<template>
  <sd-form :model="form" :auto-label-width="true">
    <sd-form-item label="Tag Number">
      <sd-input-number v-model="form.number" :min="0" :max="20" class="sd:w-50" />
    </sd-form-item>
    <sd-form-item label="List Width">
      <sd-slider v-model="form.width" :min="0" :max="800" />
    </sd-form-item>
  </sd-form>
  <div class="overflow-host sd:mt-5">
    <sd-overflow-list from="start">
      <div>DIV Element</div>
      <sd-tag v-for="item of tags" :key="item">Tag{{ item }}</sd-tag>
    </sd-overflow-list>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';

  const form = reactive({
    width: 500,
    number: 10,
  });
  const tags = computed(() => Array.from({ length: form.number }, (_, idx) => idx + 1));
  const widthPx = computed(() => `${form.width}px`);
</script>

<style scoped>
  .overflow-host {
    width: v-bind('widthPx');
  }
</style>
