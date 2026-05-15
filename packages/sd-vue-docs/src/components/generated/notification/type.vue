<template>
  <sd-space>
    <sd-button type="primary" @click="showInfo"> Info </sd-button>
    <sd-button type="primary" status="success" @click="showSuccess"> Success </sd-button>
    <sd-button type="primary" status="warning" @click="showWarning"> Warning </sd-button>
    <sd-button type="primary" status="danger" @click="showError"> Error </sd-button>
    <sd-button type="secondary" @click="showNormal"> Normal </sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue';

  import { Notification } from '@sdata/web-vue';

  interface NotificationApi {
    info: (config: string | { content: string; showIcon?: boolean }) => void;
    success: (content: string) => void;
    warning: (content: string) => void;
    error: (content: string) => void;
  }

  type NotificationProxy = {
    $notification?: NotificationApi;
  };

  const instance = getCurrentInstance();
  const proxy = instance?.proxy as NotificationProxy | undefined;

  const showInfo = () => proxy?.$notification?.info('This is an info message!');
  const showSuccess = () => proxy?.$notification?.success('This is a success message!');
  const showWarning = () => proxy?.$notification?.warning('This is a warning message!');
  const showError = () => proxy?.$notification?.error('This is an error message!');
  const showNormal = () =>
    proxy?.$notification?.info({
      content: 'This is an error message!',
      showIcon: false,
    });
</script>
