<template>
  <sd-image width="200px" :src="src" :title="title" :description="description" />
  <sd-image
    width="200px"
    :src="src"
    :title="title"
    :description="description"
    footerPosition="outer"
    class="sd:ml-4 sd:align-top"
  />
</template>

<script setup lang="ts">
  const src = 'https://picsum.photos/id/10/1000/1000';

  const title = 'A user’s avatar';

  const description = 'Present by SD Design';
</script>
