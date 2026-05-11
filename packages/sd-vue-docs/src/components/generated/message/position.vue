<template>
  <sd-space>
    <sd-button @click="showTopMessage">Top Message</sd-button>
    <sd-button @click="showBottomMessage">Bottom Message</sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue';

  interface MessageApi {
    info: (config: { content: string; position?: 'top' | 'bottom' }) => void;
  }

  type MessageProxy = {
    $message?: MessageApi;
  };

  const instance = getCurrentInstance();
  const proxy = instance?.proxy as MessageProxy | undefined;

  const showTopMessage = () => {
    proxy?.$message?.info({ content: 'This is an info message!' });
  };

  const showBottomMessage = () => {
    proxy?.$message?.info({
      content: 'This is an info message!',
      position: 'bottom',
    });
  };
</script>
