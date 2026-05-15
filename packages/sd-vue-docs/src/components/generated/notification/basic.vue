<template>
  <sd-space>
    <sd-button
      type="primary"
      @click="
        () =>
          this.$notification.info({
            title: 'Notification',
            content: 'This is a notification!',
          })
      "
    >
      Open Notification
    </sd-button>
    <sd-button @click="handleNotification"> Open Notification </sd-button>
  </sd-space>
</template>

<script setup lang="ts">
  import { Notification } from '@sdata/web-vue';

  const handleNotification = () => {
    Notification.info({
      title: 'Notification',
      content: 'This is a notification!',
    });
  };
</script>
