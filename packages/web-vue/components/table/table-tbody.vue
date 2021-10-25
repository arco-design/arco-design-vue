<template>
  <tbody>
    <slot />
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tbody',
});
</script>
