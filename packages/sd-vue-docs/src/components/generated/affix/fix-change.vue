<template>
  <sd-affix :offsetBottom="80" @change="onChange">
    <sd-button type="primary">80px to affix bottom</sd-button>
  </sd-affix>
</template>
<script setup lang="ts">
  const onChange = (fixed) => {
    console.log(`${fixed}`);
  };
</script>
