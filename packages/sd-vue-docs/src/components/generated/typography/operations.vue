<template>
  <sd-typography>
    <sd-typography-paragraph copyable> Click the icon to copy this text. </sd-typography-paragraph>
    <sd-typography-paragraph editable v-model:editText="str">
      {{ str }}
    </sd-typography-paragraph>
  </sd-typography>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const str = ref('Click the icon to edit this text.');
</script>
