<template>
  <sd-cropper :src="demoImage" height="320px" />
</template>

<script setup lang="ts">
  const demoImage =
    "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23087EA4'/%3E%3Cstop offset='1' stop-color='%2348C78E'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='360' rx='32' fill='url(%23g)'/%3E%3Ccircle cx='132' cy='128' r='44' fill='rgba(255,255,255,0.28)'/%3E%3Crect x='96' y='210' width='448' height='24' rx='12' fill='rgba(255,255,255,0.82)'/%3E%3Crect x='96' y='248' width='288' height='16' rx='8' fill='rgba(255,255,255,0.58)'/%3E%3C/svg%3E";
</script>
