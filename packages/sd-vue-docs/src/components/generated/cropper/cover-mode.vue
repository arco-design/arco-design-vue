<template>
  <sd-cropper
    :src="demoImage"
    height="320px"
    :fit-selection-to-image="false"
    :image-props="imageProps"
    :selection-props="selectionProps"
  />
</template>

<script setup lang="ts">
  const demoImage =
    "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='320' viewBox='0 0 720 320'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop stop-color='%230F172A'/%3E%3Cstop offset='1' stop-color='%230EA5E9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='320' rx='28' fill='url(%23g)'/%3E%3Crect x='78' y='66' width='564' height='188' rx='28' fill='rgba(255,255,255,0.14)'/%3E%3C/svg%3E";

  const imageProps = {
    initialCenterSize: 'cover' as const,
    translatable: true,
    scalable: true,
  };

  const selectionProps = {
    initialCoverage: 0.35,
    movable: true,
    resizable: true,
    dynamic: true,
  };
</script>
