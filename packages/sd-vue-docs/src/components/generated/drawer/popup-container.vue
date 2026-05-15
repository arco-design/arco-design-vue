<template>
  <div>
    <div
      id="parentNode"
      class="sd:relative sd:h-[300px] sd:w-full sd:overflow-hidden sd:bg-[var(--color-fill-2)] sd:text-center sd:leading-[300px]"
    >
      <sd-button type="primary" @click="handleClick">Open Drawer</sd-button>
    </div>
  </div>
  <sd-drawer popup-container="#parentNode" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title> Title </template>
    <div
      >You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.</div
    >
  </sd-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const visible = ref(false);

  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>
