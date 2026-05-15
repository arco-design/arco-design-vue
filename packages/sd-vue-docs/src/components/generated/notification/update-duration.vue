<template>
  <sd-button type="primary" @click="handleNotification"> Open Notification </sd-button>
</template>

<script setup lang="ts">
  import { Notification } from '@sdata/web-vue';

  const handleNotification = () => {
    Notification.warning({
      id: 'your_id',
      title: 'Ready to update',
      content: 'Will update after 2 seconds...',
      duration: 0,
    });

    setTimeout(() => {
      Notification.success({
        id: 'your_id',
        title: 'Success',
        content: 'Update success!',
        duration: 3000,
      });
    }, 2000);
  };
</script>
