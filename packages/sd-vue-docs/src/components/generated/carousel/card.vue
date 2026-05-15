<template>
  <sd-carousel
    :autoPlay="true"
    animation-name="card"
    show-arrow="never"
    indicator-position="outer"
    class="sd:w-full sd:h-60"
  >
    <sd-carousel-item v-for="image in images" class="sd:w-[60%]">
      <img :src="image" class="sd:w-full" />
    </sd-carousel-item>
  </sd-carousel>
</template>

<script setup lang="ts">
  const images = [
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
  ];
</script>
