<template>
  <div>
    <sd-split
      class="sd:h-50 sd:w-full sd:min-w-125 sd:border sd:border-solid sd:border-(--color-border)"
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <sd-typography-paragraph>Left</sd-typography-paragraph>
      </template>
      <template #second>
        <sd-typography-paragraph>Right</sd-typography-paragraph>
      </template>
    </sd-split>
  </div>
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  const size = shallowRef(0.5);
</script>
