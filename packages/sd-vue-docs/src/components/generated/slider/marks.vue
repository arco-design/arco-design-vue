<template>
  <sd-slider :default-value="5" class="sd:w-75" :max="15" :marks="marks" />
</template>

<script setup lang="ts">
  const marks = {
    0: '0km',
    5: '5km',
    10: '10km',
    15: '15km',
  };
</script>
