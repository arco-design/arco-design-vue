<template>
  <sd-space>
    <sd-select class="sd:w-50" v-model="province" :options="Object.keys(data)" />
    <sd-select class="sd:w-50" :options="data[province] || []" v-model="city" />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const province = ref('Sichuan');
  const city = ref('Chengdu');
  const data: Record<string, string[]> = {
    Beijing: ['Haidian', 'Chaoyang', 'Changping'],
    Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
    Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou'],
  };

  watch(province, () => {
    city.value = '';
  });
</script>
