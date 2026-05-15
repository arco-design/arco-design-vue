<template>
  <sd-space>
    <sd-select class="sd:w-50" v-model="province">
      <sd-option v-for="value of Object.keys(data)">{{ value }}</sd-option>
    </sd-select>
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
