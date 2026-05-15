<template>
  <sd-space>
    <sd-link loading>Link</sd-link>
    <sd-link :loading="loading1" @click="handleClick1">Link</sd-link>
    <sd-link :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-edit />
      </template>
      Link
    </sd-link>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { IconEdit } from '@sdata/web-vue/es/icon/index.js';

  const loading1 = ref(false);
  const loading2 = ref(false);

  function handleClick1() {
    loading1.value = true;
    setTimeout(() => {
      loading1.value = false;
    }, 3000);
  }

  function handleClick2() {
    loading2.value = true;
    setTimeout(() => {
      loading2.value = false;
    }, 3000);
  }
</script>
