<template>
  <sd-checkbox-group v-model="checkedValue">
    <sd-grid :cols="3" :colGap="24" :rowGap="16">
      <sd-grid-item>
        <sd-checkbox value="1">Option 1</sd-checkbox>
      </sd-grid-item>
      <sd-grid-item>
        <sd-checkbox value="2" disabled>Option 2</sd-checkbox>
      </sd-grid-item>
      <sd-grid-item>
        <sd-checkbox value="3">Option 3</sd-checkbox>
      </sd-grid-item>
      <sd-grid-item>
        <sd-checkbox value="4">Option 4</sd-checkbox>
      </sd-grid-item>
      <sd-grid-item>
        <sd-checkbox value="5">Option 5</sd-checkbox>
      </sd-grid-item>
    </sd-grid>
  </sd-checkbox-group>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const checkedValue = ref(['1', '2']);
</script>
