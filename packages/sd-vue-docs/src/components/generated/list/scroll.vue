<template>
  <div class="sd:mb-2.5">
    <sd-switch v-model="scrollbar" />
    Virtual Scrollbar
  </div>
  <sd-list :max-height="240" @reach-bottom="fetchData" :scrollbar="scrollbar">
    <template #header> List title </template>
    <template #scroll-loading>
      <div v-if="bottom">No more data</div>
      <sd-spin v-else />
    </template>
    <sd-list-item v-for="item of data">{{ item }}</sd-list-item>
  </sd-list>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const current = ref(1);
  const bottom = ref(false);
  const data = reactive([]);
  const scrollbar = ref(true);

  const fetchData = () => {
    console.log('reach bottom!');
    if (current.value <= 5) {
      window.setTimeout(() => {
        const index = data.length;
        data.push(
          `Beijing Bytedance Technology Co., Ltd. ${index + 1}`,
          `Bytedance Technology Co., Ltd. ${index + 2}`,
          `Beijing Toutiao Technology Co., Ltd. ${index + 3}`,
          `Beijing Volcengine Technology Co., Ltd. ${index + 4}`,
          `China Beijing Bytedance Technology Co., Ltd. ${index + 5}`,
        );
        current.value += 1;
      }, 2000);
    } else {
      bottom.value = true;
    }
  };
</script>
