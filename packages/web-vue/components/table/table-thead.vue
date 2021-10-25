<template>
  <thead>
    <slot />
  </thead>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Thead',
});
</script>
