<template>
  <div>
    <div class="sd:mb-5">
      <sd-space>
        <span>Type: </span>
        <sd-radio-group v-model="type">
          <sd-radio value="text">text</sd-radio>
          <sd-radio value="picture">picture</sd-radio>
          <sd-radio value="picture-card">picture-card</sd-radio>
        </sd-radio-group>
      </sd-space>
    </div>
    <sd-upload
      action="/"
      :list-type="type"
      :default-file-list="[
        {
          uid: '-1',
          name: 'ice.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-3',
          name: 'light.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]"
      :custom-icon="getCustomIcon()"
    />
  </div>
</template>

<script setup lang="ts">
  import { h, ref } from 'vue';

  import {
    IconUpload,
    IconFileAudio,
    IconClose,
    IconFaceFrownFill,
  } from '@sdata/web-vue/es/icon/index.js';

  const type = ref('text');
  const getCustomIcon = () => {
    return {
      retryIcon: () => h(IconUpload),
      cancelIcon: () => h(IconClose),
      fileIcon: () => h(IconFileAudio),
      removeIcon: () => h(IconClose),
      errorIcon: () => h(IconFaceFrownFill),
      fileName: (file) => {
        return `文件名： ${file.name}`;
      },
    };
  };
</script>
