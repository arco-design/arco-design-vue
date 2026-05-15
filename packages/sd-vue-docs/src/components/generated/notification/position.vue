<template>
  <sd-space>
    <sd-button type="primary" @click="handleNotification"> Top Right </sd-button>
    <sd-button type="primary" @click="handleNotificationTopLeft"> Top Left </sd-button>
    <sd-button type="primary" @click="handleNotificationBottomRight"> Bottom Right </sd-button>
    <sd-button type="primary" @click="handleNotificationBottomLeft"> Bottom Left </sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { Notification } from '@sdata/web-vue';

  const handleNotification = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
    });
  };

  const handleNotificationTopLeft = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
      position: 'topLeft',
    });
  };

  const handleNotificationBottomRight = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
      position: 'bottomRight',
    });
  };

  const handleNotificationBottomLeft = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
      position: 'bottomLeft',
    });
  };
</script>
