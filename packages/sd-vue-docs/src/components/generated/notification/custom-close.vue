<template>
  <sd-space>
    <sd-button type="primary" @click="handleNotification"> Open Notification </sd-button>
    <sd-button type="primary" status="danger" @click="handleNotification2">
      Open Notification
    </sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  import { Button, Notification } from '@sdata/web-vue';
  import { IconCloseCircle } from '@sdata/web-vue/es/icon/index.js';

  function handleNotification() {
    Notification.info({
      title: 'Notification',
      content: 'This is a notification!',
      closable: true,
      closeIcon: () => h(IconCloseCircle),
    });
  }

  function handleNotification2() {
    Notification.error({
      title: 'Notification',
      content: 'This is a notification!',
      closable: true,
      closeIconElement: () => h(Button, { size: 'mini' }, () => 'Close'),
    });
  }
</script>
