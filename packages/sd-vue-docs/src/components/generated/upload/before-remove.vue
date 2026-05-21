<template>
  <sd-space direction="vertical" class="sd:w-full">
    <sd-upload
      action="/"
      :default-file-list="[
        {
          uid: '-2',
          name: 'light.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-1',
          name: 'ice.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
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
