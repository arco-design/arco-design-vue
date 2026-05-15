<template>
  <sd-button type="primary" @click="handleClick">Confirm</sd-button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { Modal } from '@sdata/web-vue';

  const handleClick = () => {
    Modal.confirm({
      title: 'Confirm deletion',
      content:
        'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger',
      },
    });
  };
</script>
