<template>
  <sd-carousel class="sd:w-150 sd:h-60" :auto-play="true" indicator-type="dot" show-arrow="hover">
    <sd-carousel-item v-for="image in images">
      <img :src="image" class="sd:w-full" />
    </sd-carousel-item>
  </sd-carousel>
</template>

<script setup lang="ts">
  const images = [
    'https://picsum.photos/1200/480',
    'https://picsum.photos/1200/480',
    'https://picsum.photos/1200/480',
  ];
</script>
