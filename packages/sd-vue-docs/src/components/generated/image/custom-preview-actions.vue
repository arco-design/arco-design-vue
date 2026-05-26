<template>
  <sd-image
    width="200"
    src="https://picsum.photos/1000/1000"
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
