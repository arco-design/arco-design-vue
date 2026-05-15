<template>
  <sd-space size="large">
    <sd-switch :beforeChange="handleChangeIntercept" />
    <sd-switch type="round" :beforeChange="handleChangeIntercept2" />
    <sd-switch type="line" :beforeChange="handleChangeIntercept3" />
  </sd-space>
</template>

<script setup lang="ts">
  import { Message } from '@sdata/web-vue';

  const handleChangeIntercept = async (newValue: string | number | boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  };

  const handleChangeIntercept2 = async (newValue: string | number | boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!newValue) {
      Message.error("OH, You can't change");
      return false;
    }
    return true;
  };

  const handleChangeIntercept3 = async (newValue: string | number | boolean) => {
    await new Promise((_, reject) =>
      setTimeout(() => {
        Message.error('OH, Something went wrong');
        reject();
      }, 1000),
    );
    return true;
  };
</script>
