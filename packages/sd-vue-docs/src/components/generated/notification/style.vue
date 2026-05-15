<template>
  <sd-button type="primary" @click="handleNotification"> Open Notification </sd-button>
</template>

<script setup lang="ts">
  import { Notification } from '@sdata/web-vue';

  const handleNotification = () => {
    Notification.info({
      title: 'Notification',
      content: 'This is a notification!',
      closable: true,
      style: { width: '500px' },
    });
  };
</script>
