<template>
  <sd-space direction="vertical" class="sd:w-full">
    <sd-upload
      action="/"
      :fileList="file ? [file] : []"
      :show-file-list="false"
      @change="onChange"
      @progress="onProgress"
    >
      <template #upload-button>
        <div
          :class="`sd-upload-list-item${
            file && file.status === 'error' ? 'sd-upload-list-item-error' : ''
          }`"
        >
          <div class="sd:upload-list-picture custom-upload-avatar" v-if="file && file.url">
            <img :src="file.url" alt="upload preview" />
            <div class="sd:upload-list-picture-mask">
              <IconEdit />
            </div>
            <sd-progress
              v-if="file.status === 'uploading' && file.percent !== undefined && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              class="sd:absolute sd:left-1/2 sd:top-1/2 sd:-translate-x-1/2 sd:-translate-y-1/2"
            />
          </div>
          <div class="sd:upload-picture-card" v-else>
            <div class="sd:upload-picture-card-text">
              <IconPlus />
              <div class="sd:mt-2.5 sd:font-semibold">Upload</div>
            </div>
          </div>
        </div>
      </template>
    </sd-upload>
  </sd-space>
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

  import { ref } from 'vue';

  import { IconEdit, IconPlus } from '@sdata/web-vue/es/icon/index.js';

  const file = ref<FileItem | undefined>();

  const onChange = (_: FileItem[], currentFile: FileItem) => {
    file.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const onProgress = (currentFile: FileItem) => {
    file.value = currentFile;
  };
</script>
