<template>
  <sd-button @click="handleClick">Open Modal</sd-button>
  <sd-modal
    v-model:visible="visible"
    @cancel="handleCancel"
    :on-before-ok="handleBeforeOk"
    unmountOnClose
  >
    <template #title> Title </template>
    <div
      >You can customize modal body text by the current situation. This modal will be closed
      immediately once you press the OK button.
    </div>
  </sd-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const visible = ref(false);

  const handleClick = () => {
    visible.value = true;
  };
  const handleBeforeOk = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return true;
    // prevent close
    // return false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>
