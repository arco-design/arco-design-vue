<template>
  <sd-upload :custom-request="customRequest" />
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

  const customRequest = (option: RequestOption): UploadRequest => {
    const { onProgress, onError, onSuccess, fileItem, name } = option;
    const fileName = typeof name === 'function' ? name(fileItem) : (name ?? 'file');
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      xhr.upload.onprogress = function (event) {
        let percent: number | undefined;
        if (event.total > 0) {
          // 0 ~ 1
          percent = event.loaded / event.total;
        }
        if (percent !== undefined) {
          onProgress(percent, event);
        }
      };
    }
    xhr.onerror = function error(e) {
      onError(e);
    };
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return onError(xhr.responseText);
      }
      onSuccess(xhr.response);
    };

    const formData = new FormData();
    if (fileItem.file) {
      formData.append(fileName, fileItem.file);
    }
    xhr.open('post', '//upload-z2.qbox.me/', true);
    xhr.send(formData);

    return {
      abort() {
        xhr.abort();
      },
    };
  };
</script>
