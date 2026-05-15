<template>
  <sd-button type="primary" @click="handleClick">Open Drawer</sd-button>
  <sd-drawer :width="340" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title> Title </template>
    <div
      >You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
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
