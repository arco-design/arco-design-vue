<template>
  <div>
    <div>
      <sd-time-picker class="sd:w-48.5">
        <template #prefix>
          <IconInfoCircle />
        </template> </sd-time-picker
    ></div>
    <div>
      <sd-time-picker type="time-range" class="sd:w-63 sd:mt-5">
        <template #prefix>
          <IconInfoCircle />
        </template>
      </sd-time-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { IconInfoCircle } from '@sdata/web-vue/es/icon/index.js';
</script>
