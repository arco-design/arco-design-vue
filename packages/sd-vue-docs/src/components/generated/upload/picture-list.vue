<template>
  <sd-upload list-type="picture" action="/" :default-file-list="fileList" />
</template>

<script setup lang="ts">
  import type {
    CustomIcon,
    FileItem,
    FileStatus,
    RequestOption,
    UploadInstance,
    UploadRequest,
  } from '@sdata/web-vue';

  const fileList: FileItem[] = [
    {
      uid: '-2',
      name: '20200717-103937.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      uid: '-1',
      name: 'hahhahahahaha.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    },
  ];
</script>
