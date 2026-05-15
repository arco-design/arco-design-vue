<template>
  <sd-button type="primary" @click="handleNotification"> Open Notification </sd-button>
</template>

<script setup lang="ts">
  import { h } from 'vue';

  import { Notification, Space, Button } from '@sdata/web-vue';

  function handleNotification() {
    const id = `${Date.now()}`;
    const closeNotification = Notification.info({
      id,
      title: 'Notification',
      content: 'This is a notification!',
      duration: 0,
      footer: h(Space, null, () => [
        h(
          Button,
          { type: 'secondary', size: 'small', onClick: () => Notification.remove(id) },
          () => 'Cancel',
        ),
        h(Button, { type: 'primary', size: 'small', onClick: closeNotification }, () => 'Ok'),
      ]),
    });
  }
</script>
