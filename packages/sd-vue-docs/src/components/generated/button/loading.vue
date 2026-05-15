<template>
  <sd-space>
    <sd-button type="primary" loading>Primary</sd-button>
    <sd-button loading>Default</sd-button>
    <sd-button type="dashed" loading>Dashed</sd-button>
    <sd-button type="primary" :loading="loading1" @click="handleClick1">Click Me</sd-button>
    <sd-button type="primary" :loading="loading2" @click="handleClick2">
      <template #icon>
        <icon-plus />
      </template>
      Click Me
    </sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { IconPlus } from '@sdata/web-vue/es/icon/index.js';

  const loading1 = ref(false);
  const loading2 = ref(false);

  function handleClick1() {
    loading1.value = !loading1.value;
  }

  function handleClick2() {
    loading2.value = !loading2.value;
  }
</script>
