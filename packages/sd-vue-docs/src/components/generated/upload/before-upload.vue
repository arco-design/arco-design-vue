<template>
  <sd-space direction="vertical" class="sd:w-full">
    <sd-upload action="/" @before-upload="beforeUpload" />
  </sd-space>
</template>

<script setup lang="ts">
  import { Modal } from '@sdata/web-vue';

  const beforeUpload = (file: File) => {
    return new Promise<boolean>((resolve, reject) => {
      Modal.confirm({
        title: 'beforeUpload',
        content: `确认上传 ${file.name}`,
        onOk: () => resolve(true),
        onCancel: () => reject('cancel'),
      });
    });
  };
</script>
