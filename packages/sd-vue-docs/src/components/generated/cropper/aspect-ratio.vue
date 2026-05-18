<template>
  <sd-cropper :src="demoImage" height="320px" :selection-props="selectionProps" />
</template>

<script setup lang="ts">
  const demoImage =
    "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' rx='36' fill='%231A5DFF'/%3E%3Crect x='56' y='56' width='368' height='240' rx='24' fill='rgba(255,255,255,0.18)'/%3E%3Crect x='56' y='324' width='220' height='24' rx='12' fill='rgba(255,255,255,0.88)'/%3E%3Crect x='56' y='364' width='132' height='16' rx='8' fill='rgba(255,255,255,0.6)'/%3E%3C/svg%3E";

  const selectionProps = {
    aspectRatio: 1,
    initialAspectRatio: 1,
    initialCoverage: 0.5,
    movable: true,
    resizable: true,
    outlined: true,
  };
</script>
