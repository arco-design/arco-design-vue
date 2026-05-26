<template>
  <sd-upload action="/" :default-file-list="fileList" />
</template>

<script setup lang="ts">
  import type { FileItem, FileStatus } from '@sdata/web-vue';

  const fileList: FileItem[] = [
    {
      uid: '-1',
      name: 'ice.png',
      url: '//picsum.photos/1000/1000',
    },
    {
      status: 'error' as FileStatus,
      uid: '-2',
      percent: 0,
      response: '上传错误提示',
      name: 'cat.png',
      url: '//picsum.photos/1000/1000',
    },
    {
      uid: '-3',
      name: 'light.png',
      url: '//picsum.photos/1000/1000',
    },
  ];
</script>
