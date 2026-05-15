<template>
  <sd-image
    width="200"
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    :preview-props="{
      actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut'],
    }"
  >
    <template #preview-actions>
      <sd-image-preview-action name="下载" @click="download"
        ><icon-download
      /></sd-image-preview-action>
    </template>
  </sd-image>
</template>

<script setup lang="ts">
  const download = () => {
    console.log('点击下载图片');
  };
</script>
