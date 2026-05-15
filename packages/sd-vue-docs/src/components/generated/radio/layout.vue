<template>
  <sd-radio-group v-model="checkedValue">
    <sd-grid :cols="3" :colGap="24" :rowGap="16">
      <sd-grid-item>
        <sd-radio value="1">Option 1</sd-radio>
      </sd-grid-item>
      <sd-grid-item>
        <sd-radio value="2" disabled>Option 2</sd-radio>
      </sd-grid-item>
      <sd-grid-item>
        <sd-radio value="3">Option 3</sd-radio>
      </sd-grid-item>
      <sd-grid-item>
        <sd-radio value="4">Option 4</sd-radio>
      </sd-grid-item>
      <sd-grid-item>
        <sd-radio value="5">Option 5</sd-radio>
      </sd-grid-item>
    </sd-grid>
  </sd-radio-group>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const checkedValue = ref('1');
</script>
