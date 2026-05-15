<template>
  <sd-carousel class="sd:w-150 sd:h-60" :auto-play="true" animation-name="fade" show-arrow="never">
    <sd-carousel-item v-for="image in images">
      <img :src="image" class="sd:w-full" />
    </sd-carousel-item>
  </sd-carousel>
</template>

<script setup lang="ts">
  const images = [
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
  ];
</script>
