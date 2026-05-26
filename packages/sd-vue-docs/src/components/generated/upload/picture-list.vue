<template>
  <sd-upload list-type="picture" action="/" :default-file-list="fileList" />
</template>

<script setup lang="ts">
  import type { FileItem } from '@sdata/web-vue';

  const fileList: FileItem[] = [
    {
      uid: '-2',
      name: '20200717-103937.png',
      url: '//picsum.photos/1000/1000',
    },
    {
      uid: '-1',
      name: 'hahhahahahaha.png',
      url: '//picsum.photos/1000/1000',
    },
  ];
</script>
