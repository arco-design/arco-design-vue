<template>
  <sd-watermark :content="['sd.design', dayjs().format('YYYY-MM-DD')]">
    <div class="sd:w-full sd:h-75" />
  </sd-watermark>
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';
</script>
