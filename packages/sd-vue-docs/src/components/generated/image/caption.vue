<template>
  <sd-image width="200px" :src="src" :title="title" :description="description" />
  <sd-image
    width="200px"
    :src="src"
    :title="title"
    :description="description"
    footerPosition="outer"
    class="sd:ml-[67px] sd:align-top"
  />
</template>

<script setup lang="ts">
  const src =
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';

  const title = 'A user’s avatar';

  const description = 'Present by SD Design';
</script>
