<template>
  <sd-space direction="vertical" class="sd:w-full">
    <sd-upload
      action="/"
      :default-file-list="[
        {
          uid: '-2',
          name: 'light.png',
          url: '//picsum.photos/1000/1000',
        },
        {
          uid: '-1',
          name: 'ice.png',
          url: '//picsum.photos/1000/1000',
        },
      ]"
      @before-remove="beforeRemove"
    />
  </sd-space>
</template>

<script setup lang="ts">
  import type { FileItem } from '@sdata/web-vue';

  import { Modal } from '@sdata/web-vue';

  const beforeRemove = (file: FileItem) => {
    return new Promise<boolean>((resolve, reject) => {
      Modal.confirm({
        title: 'on-before-remove',
        content: `确认删除 ${file.name}`,
        onOk: () => resolve(true),
        onCancel: () => reject('cancel'),
      });
    });
  };
</script>
