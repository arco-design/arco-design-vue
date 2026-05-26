<template>
  <sd-space size="large">
    <sd-avatar>A</sd-avatar>
    <sd-avatar class="sd:bg-[#3370ff]">
      <IconUser />
    </sd-avatar>
    <sd-avatar class="sd:bg-[#14a9f8]">SD</sd-avatar>
    <sd-avatar class="sd:bg-[#00d0b6]">Design</sd-avatar>
    <sd-avatar>
      <img alt="avatar" src="https://picsum.photos/1000/1000" />
    </sd-avatar>
  </sd-space>
</template>

<script setup lang="ts">
  import { IconUser } from '@sdata/web-vue/es/icon/index.js';
</script>
